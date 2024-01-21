import routerMock from 'next-router-mock'

import {
  makeLink,
  makeSocialPage,
  makeUser,
  makeUserTheme,
  setup,
} from '@/__tests__/__helpers__'
import UserPage from '@/app/[username]/page'
import * as fetchUser from '@/data/usecases/user'
import {Link, SocialPage, User} from '@/domain/models'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('@/data/usecases/user')

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  redirect: jest.fn(),
}))

const handleFetchLinks = (
  user?: User,
  links?: Link[],
  socials?: SocialPage[],
) => {
  const userMock = user ?? makeUser()
  const linksMock = links ?? [makeLink(), makeLink()]
  const socialsMock = socials ?? [makeSocialPage(), makeSocialPage()]

  jest
    .spyOn(fetchUser, 'fetchUserProfile')
    .mockImplementation(() => Promise.resolve(userMock))
  jest
    .spyOn(fetchUser, 'fetchUserLinks')
    .mockImplementation(() => Promise.resolve(linksMock))
  jest
    .spyOn(fetchUser, 'fetchUserSocialPages')
    .mockImplementation(() => Promise.resolve(socialsMock))
}

const makeSUT = async (username: string) => {
  const sut = await UserPage({params: {username: username}})
  return setup(sut)
}

describe('User page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render page with links', async () => {
    const userMock = makeUser() as Required<User>
    Object.assign(userMock, {theme: makeUserTheme()})

    routerMock.push(`/${userMock.username}`)
    handleFetchLinks(userMock)

    const {debug} = await waitFor(() => makeSUT(userMock.username))

    debug()

    const name = screen.getByRole('heading', {level: 2})
    const linkList = await screen.queryByRole('list')
    const profilePicture = await screen.queryAllByRole('img')[0]

    expect(name.textContent).toBe(userMock.name)
    expect(linkList?.children).toHaveLength(2)
    expect(profilePicture?.getAttribute('src')).toContain(
      encodeURIComponent(userMock.pictureUrl),
    )
  })

  it('should load user custom theme', async () => {
    const userMock = makeUser(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      makeUserTheme(),
    ) as Required<User>

    const linkMock = makeLink()

    routerMock.push(`/${userMock.username}`)
    handleFetchLinks(userMock, [linkMock])

    await waitFor(() => makeSUT(userMock.username))

    const container = screen.getByRole('main')
    const containerOverlay = container.querySelector('section')
    const buttons = container.querySelectorAll('li')
    const username = screen.getByText(userMock.name)

    if (!containerOverlay || !buttons) return fail()

    const {theme} = userMock

    expect(container.style.backgroundImage).toBe(
      `url(${theme?.backgroundImage})`,
    )
    expect(containerOverlay.style.backgroundColor).toBe(theme?.backgroundColor)
    expect(buttons[0].style.backgroundColor).toBe(theme?.buttonBackground)
    expect(buttons[0].style.color).toBe(theme?.buttonTextColor)
    expect(username.style.color).toBe(theme?.usernameColor)
  })
})

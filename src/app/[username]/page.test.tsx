import {makeLink, makeSocialPage, makeUser, setup} from '@/__tests__'
import * as fetchUser from '@/api/usecases/user'
import UserPage from '@/app/[username]/page'
import {Link, SocialPage, User} from '@/domain/models'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('firebase-admin/auth', () => ({
  ...jest.mock('firebase-admin/auth'),
  getAuth: jest.fn(),
}))

jest.mock('@/api/usecases/user')

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  redirect: jest.fn(),
}))

const handleFetchLinks = (
  user?: Required<User>,
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

  return {userMock, linksMock, socialsMock}
}

const makeSUT = async (username: string) => {
  const sut = await UserPage({params: {username}})
  return setup(sut)
}

describe('User page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render default theme with header, social pages and page links', async () => {
    const {userMock} = await handleFetchLinks()

    await waitFor(() => makeSUT(userMock?.username))

    const header = screen.queryByTestId('user-page-header')
    const headerPicture = header?.querySelector('img')
    const headerName = header?.querySelector('h2')
    const headerBio = header?.querySelector('p')

    const socialPages = screen.queryByTestId('user-page-social-pages')
    const pageLinks = screen.queryByTestId('user-page-page-links')

    expect(headerPicture?.src).toMatch(encodeURIComponent(userMock.pictureUrl))
    expect(headerName).toHaveTextContent(userMock.name)
    expect(headerBio).toHaveTextContent(userMock.bio)

    expect(socialPages?.children).toHaveLength(2)
    expect(pageLinks?.children).toHaveLength(2)
  })
})

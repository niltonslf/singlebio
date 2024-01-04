import * as firestore from 'firebase/firestore'
import routerMock from 'next-router-mock'

import {
  makeGetDocsResponse,
  makeLink,
  makeUser,
  makeUserTheme,
  setup,
} from '@/__tests__/__helpers__'
import UserPage from '@/app/[username]/page'
import Layout from '@/app/layout'
import {User} from '@/models'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
}))

const handleFetchLinks = (firstData: any[], secondData: any[]) => {
  jest.spyOn(firestore, 'query').mockImplementation()
  jest.spyOn(firestore, 'collection').mockImplementation()
  jest.spyOn(firestore, 'where').mockImplementation()

  jest
    .spyOn(firestore, 'getDocs')
    .mockResolvedValueOnce(makeGetDocsResponse({docs: firstData}))

  jest
    .spyOn(firestore, 'getDocs')
    .mockResolvedValueOnce(makeGetDocsResponse({docs: secondData}))
}

const makeSUT = ({usernameMock = ''} = {}) => {
  return setup(
    <Layout>
      <UserPage params={{username: usernameMock ?? ''}} />
    </Layout>,
  )
}

describe('User page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render page with links', async () => {
    const userMock = makeUser() as Required<User>
    const linkMock = makeLink()

    handleFetchLinks([userMock], [linkMock])

    await waitFor(() => makeSUT())

    const username = screen.getByRole('heading', {level: 2})
    const linkList = await screen.queryByRole('list')
    const profilePicture = await screen.queryAllByRole('img')[0]

    expect(username.textContent).not.toBe('')
    expect(linkList?.children).toHaveLength(1)
    expect(profilePicture?.getAttribute('src')).toContain(
      encodeURIComponent(userMock.pictureUrl),
    )
  })

  it("should redirect to /not-found if there isn't links", async () => {
    const usernameMock = 'some-username'

    handleFetchLinks([makeUser()], [])

    await waitFor(() => makeSUT({usernameMock}))

    const linkList = await screen.queryByRole('list')
    expect(linkList?.children).toHaveLength(0)

    await waitFor(() => {
      expect(routerMock.pathname).toBe('/not-found')
    })
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

    handleFetchLinks([userMock], [linkMock])

    await waitFor(() => makeSUT({usernameMock: userMock.username}))

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

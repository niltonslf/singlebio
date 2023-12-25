import * as firestore from 'firebase/firestore'

import {
  makeGetDocsResponse,
  makeLink,
  makeUser,
  makeUserTheme,
  fail,
  setup,
} from '@/__tests__/__helpers__'
import UserPage from '@/app/[username]/page'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
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

describe('User page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render page with links', async () => {
    const userMock = makeUser()
    const linkMock = makeLink()

    handleFetchLinks([userMock], [linkMock])

    await waitFor(() =>
      setup(<UserPage params={{username: userMock.username}} />),
    )

    const username = screen.getByRole('heading', {level: 2})
    const linkList = await screen.queryByRole('list')
    const profilePicture = await screen.queryByRole('img')

    expect(username.textContent).toBe(`@${userMock.username}`)
    expect(linkList?.children).toHaveLength(1)
    expect(profilePicture?.getAttribute('src')).toContain(
      encodeURIComponent(userMock.pictureUrl),
    )
  })

  it("should show alert message when there isn't links saved", async () => {
    const usernameMock = 'jsdevbr'

    handleFetchLinks([makeUser()], [])

    await waitFor(() => setup(<UserPage params={{username: usernameMock}} />))

    const username = screen.getByRole('heading', {level: 2})
    expect(username.textContent).toBe(`@${usernameMock}`)

    const linkList = await screen.queryByRole('list')
    expect(linkList?.children).toHaveLength(0)

    await waitFor(() => {
      const alertMessage = screen.getByText('No links in this profile')
      expect(alertMessage).toBeInTheDocument()
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
    )
    const linkMock = makeLink()

    handleFetchLinks([userMock], [linkMock])

    await waitFor(() =>
      setup(<UserPage params={{username: userMock.username}} />),
    )

    const container = screen.getByRole('main')
    const containerOverlay = container.querySelector('div')
    const buttons = container.querySelectorAll('li')
    const username = screen.getByText(`@${userMock.username}`)

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

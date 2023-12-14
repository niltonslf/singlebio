import * as firestore from 'firebase/firestore'

import {setup} from '@/__tests__/utils'
import {makeGetDocsResponse, makeLink, makeUser} from '@/__tests__/utils/mocks'
import UserPage from '@/app/[userName]/page'
import '@testing-library/jest-dom'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}))

describe('Render user links page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render page with all elements', async () => {
    const userMock = makeUser()
    const linkMock = makeLink()

    jest.spyOn(firestore, 'query').mockImplementation()
    jest.spyOn(firestore, 'collection').mockImplementation()
    jest.spyOn(firestore, 'where').mockImplementation()

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValueOnce(makeGetDocsResponse({docs: [userMock]}))

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValueOnce(makeGetDocsResponse({docs: [linkMock]}))

    await waitFor(() =>
      setup(<UserPage params={{userName: userMock.userName}} />),
    )

    const userName = screen.getByRole('heading', {level: 2})
    const linkList = await screen.queryByRole('list')
    const profilePicture = await screen.queryByRole('img')

    expect(userName.textContent).toBe(`@${userMock.userName}`)
    expect(linkList?.children).toHaveLength(1)
    expect(profilePicture?.getAttribute('src')).toContain(
      encodeURIComponent(userMock.pictureUrl),
    )
  })

  it("should show alert message when there isn't links saved", async () => {
    const userNameMock = 'jsdevbr'

    jest.spyOn(firestore, 'query').mockImplementation()
    jest.spyOn(firestore, 'collection').mockImplementation()
    jest.spyOn(firestore, 'where').mockImplementation()

    const usersResponse = makeGetDocsResponse({docs: [makeUser()]})

    // getdocs that fetch users
    jest.spyOn(firestore, 'getDocs').mockResolvedValueOnce(usersResponse)

    const linksResponse = makeGetDocsResponse({docs: []})
    // getdocs that fetch links from the users
    jest.spyOn(firestore, 'getDocs').mockResolvedValueOnce(linksResponse)

    await waitFor(() => setup(<UserPage params={{userName: userNameMock}} />))

    const userName = screen.getByRole('heading', {level: 2})
    expect(userName.textContent).toBe(`@${userNameMock}`)

    const linkList = await screen.queryByRole('list')
    expect(linkList?.children).toHaveLength(0)

    await waitFor(() => {
      const alertMessage = screen.getByText('No links in this profile')
      expect(alertMessage).toBeInTheDocument()
    })
  })
})

import * as firestore from 'firebase/firestore'

import {setup} from '@/__tests__/utils'
import UserPage from '@/app/[userName]/page'
import '@testing-library/jest-dom'
import {User} from '@/models'
import {faker} from '@faker-js/faker'
import {screen, waitFor} from '@testing-library/react'
import {makeUser} from '@/__tests__/utils/mocks'

jest.mock('firebase/firestore')

afterEach(() => {
  jest.clearAllMocks()
})

describe('Render user links page', () => {
  it('should render page with all elements', async () => {
    const user = makeUser()
    const userResponseMock = {
      ref: {path: faker.internet.url},
      data: (): User => user,
    } as any

    const linksResponseMock = {
      data: () => ({
        label: faker.word.words(2),
        url: faker.image.urlLoremFlickr(),
      }),
    } as any

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValueOnce({docs: [userResponseMock]} as any)

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValueOnce({docs: [linksResponseMock], size: 1} as any)

    await waitFor(() => setup(<UserPage params={{userName: user.userName}} />))

    const userName = screen.getByRole('heading', {level: 2})
    const linkList = await screen.queryByRole('list')
    const profilePicture = await screen.queryByRole('img')

    expect(userName.textContent).toBe(`@${user.userName}`)
    expect(linkList?.children).toHaveLength(1)
    expect(profilePicture?.getAttribute('src')).toContain(
      encodeURIComponent(user.pictureUrl),
    )
  })

  it("should show alert message when there isn't links saved", async () => {
    const userNameMock = 'jsdevbr'

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValue({docs: [], size: 0} as any)

    await waitFor(() => setup(<UserPage params={{userName: userNameMock}} />))

    const userName = screen.getByRole('heading', {level: 2})
    expect(userName.textContent).toBe(`@${userNameMock}`)

    const linkList = await screen.queryByRole('list')
    expect(linkList?.children).toHaveLength(0)

    const alertMessage = await screen.queryByText('No links in this profile')
    expect(alertMessage).toBeInTheDocument()
  })
})

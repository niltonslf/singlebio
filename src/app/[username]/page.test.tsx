import {cleanup} from '@testing-library/react'

jest.mock('@/api/usecases/user')

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  redirect: jest.fn(),
}))

// const handleFetchLinks = (
//   user?: User,
//   links?: Link[],
//   socials?: SocialPage[],
// ) => {
//   const userMock = user ?? makeUser()
//   const linksMock = links ?? [makeLink(), makeLink()]
//   const socialsMock = socials ?? [makeSocialPage(), makeSocialPage()]

//   jest
//     .spyOn(fetchUser, 'fetchUserProfile')
//     .mockImplementation(() => Promise.resolve(userMock))
//   jest
//     .spyOn(fetchUser, 'fetchUserLinks')
//     .mockImplementation(() => Promise.resolve(linksMock))
//   jest
//     .spyOn(fetchUser, 'fetchUserSocialPages')
//     .mockImplementation(() => Promise.resolve(socialsMock))
// }

// const makeSUT = async (username: string) => {
//   const sut = await UserPage({params: {username: username}})
//   return setup(sut)
// }

describe('User page', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it.todo('should render page with links')

  it.todo('should load user custom theme')
})

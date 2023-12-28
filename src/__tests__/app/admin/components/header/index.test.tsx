import * as firebaseAuth from 'firebase/auth'
import routerMock from 'next-router-mock'

import {fail, setup} from '@/__tests__/__helpers__'
import {makeUser} from '@/__tests__/__helpers__'
import {Header} from '@/app/admin/components/header'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/models'
import {act, cleanup, screen} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/admin'),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()
  authStore.setUser(userMock)

  const sut = setup(<Header navbarHandler={<></>} />)

  return {userMock, ...sut}
}

describe('Header component', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  it('render Header with profile button, page link, and welcome message', () => {
    const {userMock} = makeSUT()

    const welcomeMsg = screen.getByText(/hello,/i)
    const pageLink = document.querySelector('header > div > a')
    const profileBtn = document.querySelector('header div:nth-child(2)')

    if (!profileBtn) return fail()

    expect(pageLink).toHaveAttribute('href', `/${userMock.username}`)
    expect(profileBtn).toBeVisible()
    expect(welcomeMsg).toBeVisible()
  })

  it('render component without user image', () => {
    const {userMock} = makeSUT()

    const profileBtn = document.querySelector('header div:nth-child(2)')
    const avatar = profileBtn?.querySelector('span')

    if (!profileBtn) return fail()

    expect(avatar?.textContent).toBe(userMock.name[0])
  })

  it('should logout user', async () => {
    routerMock.push('/admin')

    jest.spyOn(firebaseAuth, 'getAuth').mockImplementation()
    jest.spyOn(firebaseAuth, 'signOut').mockImplementation()
    jest.spyOn(routerMock, 'push')

    const {userMock, user} = makeSUT()
    // fake login
    await act(() => {
      authStore.setUser(userMock)
    })

    const logoutBtn = screen.getByText(/logout/i)
    expect(logoutBtn).toBeVisible()

    await user.click(logoutBtn)

    expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1)
    expect(routerMock.pathname).toBe('/admin')
  })
})

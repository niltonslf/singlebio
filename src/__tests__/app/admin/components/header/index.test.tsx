import * as firebaseAuth from 'firebase/auth'
import routerMock from 'next-router-mock'

import {fail, setup} from '@/__tests__/__helpers__'
import {makeUser} from '@/__tests__/__helpers__'
import {Header} from '@/app/admin/components/header'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/domain/models'
import {cleanup, screen} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/admin/links'),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()
  adminStore.setUser(userMock)

  const sut = setup(<Header navbarHandler={<></>} />)

  return {userMock, ...sut}
}

describe('Header component', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  it('render Header with profile button, page link and copy link button', () => {
    const {userMock} = makeSUT()

    const copyLinkButton = screen.getByRole('button', {name: 'Copy link'})
    const pageLink: HTMLLinkElement | null = document.querySelector(
      'header > div > div > a',
    )
    const profileBtn = screen.getByRole('img')

    if (!profileBtn) return fail()

    expect(pageLink?.href).toMatch(`${userMock.username}`)
    expect(profileBtn).toBeVisible()
    expect(copyLinkButton).toBeVisible()
  })

  it('render component without user image', () => {
    const {userMock} = makeSUT()

    const profileBtn = document.querySelector(
      'header > div:nth-child(2) > details > summary',
    )
    const avatar = profileBtn?.querySelector('span')

    if (!profileBtn) return fail()

    expect(avatar?.textContent).toBe(userMock.name[0])
  })

  it('should logout user', async () => {
    routerMock.push('/admin/links')

    jest.spyOn(firebaseAuth, 'getAuth').mockImplementation()
    jest.spyOn(firebaseAuth, 'signOut').mockImplementation()
    jest.spyOn(routerMock, 'push')

    const userMock = makeUser()

    // fake login
    adminStore.setUser(userMock)

    const {user} = makeSUT(userMock)
    const logoutBtn = screen.getByText(/logout/i).parentElement

    if (!logoutBtn) return fail()

    await user.click(logoutBtn)

    expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1)
  })
})

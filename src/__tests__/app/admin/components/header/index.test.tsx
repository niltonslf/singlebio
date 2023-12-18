import * as firebaseAuth from 'firebase/auth'
import routerMock from 'next-router-mock'

import {setup} from '@/__tests__/utils'
import '@testing-library/jest-dom'
import {makeUser} from '@/__tests__/utils/mocks'
import {Header} from '@/app/admin/components/header'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/models'
import {cleanup, screen} from '@testing-library/react'

import {act} from 'react-dom/test-utils'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()

  const sut = setup(<Header user={userMock} />)

  return {
    userMock,
    ...sut,
  }
}

describe('Header component', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  it('render component with logo and user data', () => {
    const {userMock} = makeSUT()

    const header = screen.getByText('Lnktree admin')
    expect(header).toBeInTheDocument

    const username = screen.getByText(userMock.name)
    expect(username.textContent).toBe(userMock.name)

    const profilePicture = screen.getByRole('img')
    expect(profilePicture).toBeInTheDocument
  })

  // ? Check if this tests is really necessary
  it('render component without user image', () => {
    const {userMock} = makeSUT()

    const header = screen.getByText('Lnktree admin')
    expect(header).toBeInTheDocument

    const username = screen.getByText(userMock.name || '')
    expect(username.textContent).toBe(userMock.name)

    const profilePicture = screen.queryByRole('img')
    expect(profilePicture).not.toBeInTheDocument
  })

  // ? Check if this tests is really necessary
  it('render component without user name', () => {
    makeSUT(makeUser(undefined, ''))

    const header = screen.getByText('Lnktree admin')
    expect(header).toBeInTheDocument

    const username = document.querySelector('header > div > div > span')
    expect(username).toBeEmptyDOMElement()

    const profilePicture = screen.getByRole('img')
    expect(profilePicture).toBeInTheDocument()
  })

  it('should logout user', async () => {
    routerMock.push('/admin')

    jest.spyOn(firebaseAuth, 'getAuth').mockImplementation()
    jest.spyOn(firebaseAuth, 'signOut').mockImplementation()
    jest.spyOn(routerMock, 'push')

    const {userMock, user} = makeSUT()
    // fake login
    await act(() => {
      authStore.updateUser(userMock)
    })

    const logoutBtn = screen.getByText(/logout/i)
    expect(logoutBtn).toBeVisible()

    await user.click(logoutBtn)

    expect(firebaseAuth.getAuth).toHaveBeenCalledTimes(1)
    expect(firebaseAuth.signOut).toHaveBeenCalledTimes(1)
    expect(routerMock.push).toHaveBeenCalledTimes(1)
    expect(routerMock.pathname).toBe('/')
  })
})

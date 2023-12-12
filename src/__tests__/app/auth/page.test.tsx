import '@testing-library/jest-dom'
import * as firebaseAuth from 'firebase/auth'
import mockRouter from 'next-router-mock'

import {setup, makeFbUser} from '@/__tests__/utils'
import {AuthStore, authStore} from '@/app/auth/context/auth-store'
import AuthPage from '@/app/auth/page'
import {User} from '@/models'
import {parseToUser} from '@/utils/user'
import {screen, render, cleanup} from '@testing-library/react'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  setDoc: jest.fn(),
  doc: jest.fn(),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

/**
 * Generators helpers
 */

export const validateGoogleBtn = () => {
  const googleButton = screen.getByRole('button')
  expect(googleButton.textContent).toBe('Sign up with Google')

  return googleButton
}

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

describe('Auth Page', () => {
  it('should render Auh page with the login button', () => {
    render(<AuthPage />)

    const formTitle = screen.getByText('SignIn')
    expect(formTitle.textContent).toBe('SignIn')

    validateGoogleBtn()
  })

  it('Should return an error when clicked to Login with Google', async () => {
    const errorMsg = 'error'

    jest.spyOn(firebaseAuth, 'signInWithPopup').mockRejectedValue(errorMsg)

    jest.spyOn(authStore, 'clearUser')
    jest.spyOn(authStore, 'authUser')
    jest.spyOn(mockRouter, 'push')

    const {user} = setup(<AuthPage />)

    const googleButton = validateGoogleBtn()

    await user.click(googleButton)

    const errorBox = await screen.getByTestId('error-msg')

    expect(firebaseAuth.signInWithPopup).rejects.toBe(errorMsg)
    expect(authStore.clearUser).toHaveBeenCalledTimes(1)
    expect(errorBox).toBeVisible()
    expect(errorBox).toHaveTextContent(
      /There was an error to access your account/i,
    )

    expect(authStore.authUser).toHaveBeenCalledTimes(0)
    expect(mockRouter.push).toHaveBeenCalledTimes(0)
  })

  it('Should Login with Google successfully  ', async () => {
    const firebaseUserMock = makeFbUser()
    const userMock = parseToUser(firebaseUserMock) as User

    jest
      .spyOn(firebaseAuth, 'signInWithPopup')
      .mockResolvedValue({user: firebaseUserMock} as any)

    AuthStore.prototype['fetchFirebaseUser'] = args =>
      Promise.resolve({exists: true, user: userMock})

    const {user} = setup(<AuthPage />)
    const googleButton = validateGoogleBtn()
    await user.click(googleButton)

    expect(authStore.authUser).toHaveBeenCalledWith(firebaseUserMock)
    expect(authStore.authUser).toHaveBeenCalledTimes(1)

    expect(authStore.user).toStrictEqual(userMock)

    expect(mockRouter).toMatchObject({
      asPath: '/admin',
      pathname: '/admin',
      query: {},
    })
  })

  it('Should create a new user and Login with Google successfully  ', async () => {
    const firebaseUserMock = makeFbUser()
    const userMock = parseToUser(firebaseUserMock)

    jest
      .spyOn(firebaseAuth, 'signInWithPopup')
      .mockResolvedValue({user: firebaseUserMock} as any)

    AuthStore.prototype['fetchFirebaseUser'] = args =>
      Promise.resolve({exists: false, user: undefined})

    const {user} = setup(<AuthPage />)
    const googleButton = validateGoogleBtn()
    await user.click(googleButton)

    expect(authStore.authUser).toHaveBeenCalledWith(firebaseUserMock)
    expect(authStore.authUser).toHaveBeenCalledTimes(1)
    expect(authStore.user).toStrictEqual({...userMock, userName: ''})

    expect(mockRouter).toMatchObject({
      asPath: '/admin',
      pathname: '/admin',
      query: {},
    })
  })
})

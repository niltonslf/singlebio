import '@testing-library/jest-dom'
import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import mockRouter from 'next-router-mock'

import {setup} from '@/__tests__/utils'
import {makeFbUser, makeUser} from '@/__tests__/utils/mocks'
import {AuthStore, authStore} from '@/app/auth/context/auth-store'
import AuthPage from '@/app/auth/page'
import {screen, render, cleanup} from '@testing-library/react'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
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

    expect(firebaseAuth.signInWithPopup).rejects.toThrow(errorMsg)
    expect(authStore.clearUser).toHaveBeenCalledTimes(1)
    expect(errorBox).toBeVisible()
    expect(errorBox).toHaveTextContent(
      /There was an error to access your account/i,
    )

    expect(authStore.authUser).toHaveBeenCalledTimes(0)
    expect(mockRouter.push).toHaveBeenCalledTimes(0)
  })

  it('Should Login with Google successfully  ', async () => {
    jest
      .spyOn(firebaseAuth, 'signInWithPopup')
      .mockResolvedValue({user: makeFbUser()} as any)

    AuthStore.prototype['fetchFirebaseUser'] = args =>
      Promise.resolve({exists: true, user: makeUser()})

    jest.spyOn(firestore, 'doc').mockImplementation(jest.fn())

    jest.spyOn(firestore, 'getDoc').mockResolvedValueOnce({
      data: () => makeFbUser(),
      exists: true,
    } as any)

    const {user} = setup(<AuthPage />)

    const googleButton = validateGoogleBtn()

    await user.click(googleButton)

    expect(mockRouter).toMatchObject({
      asPath: '/admin',
      pathname: '/admin',
      query: {},
    })
  })
})

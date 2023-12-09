import '@testing-library/jest-dom'
import * as auth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import mockRouter from 'next-router-mock'

import {setup} from '@/__tests__/utils'
import {makeFbUser, makeUser} from '@/__tests__/utils/mocks'
import {AuthStore} from '@/app/auth/context/auth-state'
import AuthPage from '@/app/auth/page'
import {screen, render} from '@testing-library/react'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

jest.mock('firebase/firestore', () => {
  return {__esModule: true, ...jest.requireActual('firebase/firestore')}
})

jest.mock('firebase/auth', () => {
  return {__esModule: true, ...jest.requireActual('firebase/auth')}
})

jest.mock('@/app/auth/context/auth-state.ts', () => ({
  __esModule: true,
  ...jest.requireActual('@/app/auth/context/auth-state.ts'),
}))

/**
 * Generators
 */

export const validateGoogleBtn = () => {
  const googleButton = screen.getByRole('button')
  expect(googleButton.textContent).toBe('Sign up with Google')

  return googleButton
}

describe('Auth Page', () => {
  it('render Auh page with the login button', () => {
    render(<AuthPage />)

    const formTitle = screen.getByText('SignIn')
    expect(formTitle.textContent).toBe('SignIn')

    validateGoogleBtn()
  })

  it('Should return an error when clicked to Login with Google', async () => {
    jest.spyOn(auth, 'signInWithPopup').mockRejectedValue('error')

    const {user} = setup(<AuthPage />)

    const googleButton = validateGoogleBtn()

    await user.click(googleButton)

    const errorBox = await screen.getByText(
      'There was an error to access your account. Please, try again later or use a different account.',
    )

    expect(errorBox).toBeVisible()
  })

  it('Should Login with Google successfully  ', async () => {
    jest
      .spyOn(auth, 'signInWithPopup')
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

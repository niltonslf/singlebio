import '@testing-library/jest-dom'
import * as firebaseAuth from 'firebase/auth'
import mockRouter from 'next-router-mock'

import {makeFbUser} from '@/__tests__/utils'
import {AuthStore, authStore} from '@/app/auth/context/auth-store'
import AuthPage from '@/app/auth/page'
import {User} from '@/models'
import {parseToUser} from '@/utils/user'
import {screen, render, cleanup, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

const mockSignInWithPopup = (result: any, isReject: boolean = false) => {
  const spy = jest.spyOn(firebaseAuth, 'signInWithPopup')

  if (!isReject) return spy.mockResolvedValue(result)

  return spy.mockRejectedValue(result)
}

const mockFetchFirebaseUser = (exists: boolean, user: User | undefined) => {
  AuthStore.prototype['fetchFirebaseUser'] = args =>
    Promise.resolve({exists, user})
}

const validateGoogleBtn = () => {
  const googleButton = screen.getByText('Sign up with Google')
  expect(googleButton).toBeVisible()
  return googleButton
}

describe('Auth Page', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render Auth page with the login button', async () => {
    await waitFor(() => render(<AuthPage />))

    const formTitle = screen.getByText(/lnktree/i)

    expect(formTitle.textContent).toBe('Lnktree')
    validateGoogleBtn()
  })

  it('Should return an error when clicked to Login with Google', async () => {
    const errorMsg = 'error'

    mockSignInWithPopup(errorMsg, true)
    mockFetchFirebaseUser(true, undefined)

    jest.spyOn(authStore, 'authUser')
    jest.spyOn(authStore, 'clearUser')
    jest.spyOn(mockRouter, 'push')

    const user = userEvent.setup()

    await waitFor(() => render(<AuthPage />))

    const googleButton = validateGoogleBtn()

    await user.click(googleButton)

    const errorBox = await screen.findByTestId('error-msg')

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

    mockSignInWithPopup({user: firebaseUserMock})
    mockFetchFirebaseUser(true, userMock)
    jest.spyOn(authStore, 'authUser')

    const user = userEvent.setup()

    await waitFor(() => render(<AuthPage />))
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

  it('Should create a new user and Login with Google successfully', async () => {
    const firebaseUserMock = makeFbUser()
    const userMock = parseToUser(firebaseUserMock)

    mockSignInWithPopup({user: firebaseUserMock})
    mockFetchFirebaseUser(false, undefined)
    jest.spyOn(authStore, 'authUser')

    const user = userEvent.setup()
    await waitFor(() => render(<AuthPage />))
    const googleButton = validateGoogleBtn()

    await user.click(googleButton)

    expect(authStore.authUser).toHaveBeenCalledWith(firebaseUserMock)
    expect(authStore.authUser).toHaveBeenCalledTimes(1)
    expect(authStore.user).toStrictEqual({...userMock, username: ''})

    expect(mockRouter).toMatchObject({
      asPath: '/admin',
      pathname: '/admin',
      query: {},
    })
  })
})

import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import mockRouter from 'next-router-mock'

import {makeFbUser, makeGetDocsResponse, setup} from '@/__tests__/__helpers__'
import {authStore} from '@/app/auth/context/auth-store'
import AuthLayout from '@/app/auth/layout'
import AuthPage from '@/app/auth/page'
import {User} from '@/models'
import {parseToUser} from '@/utils/user'
import {screen, render, cleanup, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/auth'),
}))

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

const validateGoogleBtn = () => {
  const googleButton = screen.getByText('Sign in with Google')
  expect(googleButton).toBeVisible()
  return googleButton
}

const validateGithubBtn = () => {
  const githubButton = screen.getByText('Sign in with GitHub')
  expect(githubButton).toBeVisible()
  return githubButton
}

const makeSUT = async () => {
  return await waitFor(() =>
    setup(
      <AuthLayout>
        <AuthPage />
      </AuthLayout>,
    ),
  )
}

describe('Auth Page', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render Auth page with all sign in methods', async () => {
    await makeSUT()

    const formLogo = screen.getByRole('img')
    const emailInput = screen.getByRole('textbox')
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const signInButton = screen.getByText(/Sign in with email/i)
    const forgotPasswordLink = screen.getByRole('link', {
      name: /forgot your password\?/i,
    })
    const createAccountLink = screen.getByRole('link', {
      name: /create an account/i,
    })

    expect(formLogo).toHaveAttribute('alt', 'logo')
    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(signInButton).toBeVisible()
    expect(forgotPasswordLink).toBeVisible()
    expect(createAccountLink).toBeVisible()
    validateGoogleBtn()
    validateGithubBtn()
  })

  it('Should return an error when clicked to Login with Google', async () => {
    const errorMsg = 'error'

    mockSignInWithPopup(errorMsg, true)
    jest
      .spyOn(firestore, 'getDoc')
      .mockResolvedValue(makeGetDocsResponse({data: undefined, exists: false}))

    jest.spyOn(authStore, 'authUser')
    jest.spyOn(authStore, 'clearUser')

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
  })

  it('Should Login with Google successfully  ', async () => {
    const firebaseUserMock = makeFbUser()
    const userMock = parseToUser(firebaseUserMock) as User

    mockSignInWithPopup({user: firebaseUserMock})
    jest.spyOn(authStore, 'authUser')

    jest
      .spyOn(firestore, 'getDoc')
      .mockResolvedValue(makeGetDocsResponse({data: userMock, exists: true}))

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
    jest
      .spyOn(firestore, 'getDoc')
      .mockResolvedValue(makeGetDocsResponse({data: undefined, exists: false}))
    jest.spyOn(authStore, 'authUser')

    const user = userEvent.setup()
    await waitFor(() => render(<AuthPage />))
    const googleButton = validateGoogleBtn()

    await user.click(googleButton)

    expect(authStore.authUser).toHaveBeenCalledWith(firebaseUserMock)
    expect(authStore.authUser).toHaveBeenCalledTimes(1)
    expect(authStore.user).toStrictEqual({...userMock})

    expect(mockRouter).toMatchObject({
      asPath: '/admin',
      pathname: '/admin',
      query: {},
    })
  })
})

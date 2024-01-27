import mockRouter from 'next-router-mock'

import {makeFbUser, makeUser, setup} from '@/__tests__/__helpers__'
import {authStore} from '@/app/auth/context/auth-store'
import AuthLayout from '@/app/auth/layout'
import AuthPage from '@/app/auth/page'
import {User} from '@/domain/models'
import {parseToUser} from '@/utils/user'
import {faker} from '@faker-js/faker'
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

  describe('sign in with email', () => {
    it('should sign in with email successfully', async () => {
      const userMock = makeUser()

      jest
        .spyOn(authStore, 'signInWithEmailAndPassword')
        .mockResolvedValue(userMock)

      const {user} = await makeSUT()

      const emailInput = screen.getByRole('textbox')
      const passwordInput = screen.getByPlaceholderText(/password/i)
      const signInButton = screen.getByText(/Sign in with email/i)

      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      await user.type(emailInput, emailMock)
      await user.type(passwordInput, passwordMock)
      await user.click(signInButton)

      expect(authStore.signInWithEmailAndPassword).toHaveBeenCalledWith(
        emailMock,
        passwordMock,
      )
      expect(mockRouter).toMatchObject({
        asPath: '/admin',
        pathname: '/admin',
        query: {},
      })
    })
    it('should return an error when tried to sign in with email', async () => {
      jest
        .spyOn(authStore, 'signInWithEmailAndPassword')
        .mockRejectedValue('error message')

      const {user} = await makeSUT()

      const emailInput = screen.getByRole('textbox')
      const passwordInput = screen.getByPlaceholderText(/password/i)
      const signInButton = screen.getByText(/Sign in with email/i)

      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      await user.type(emailInput, emailMock)
      await user.type(passwordInput, passwordMock)
      await user.click(signInButton)

      const errorMsg = screen.getByTestId('error-msg')

      expect(authStore.signInWithEmailAndPassword).toHaveBeenCalledWith(
        emailMock,
        passwordMock,
      )

      expect(errorMsg).toHaveTextContent('error message')
      expect(mockRouter).toMatchObject({asPath: '/auth', pathname: '/auth'})
    })
  })

  describe('Sign in with google', () => {
    it('Should return an error when clicked to Login with Google', async () => {
      const errorMsg = 'error message'
      jest.spyOn(authStore, 'signInWithGoogle').mockRejectedValue(errorMsg)

      const user = userEvent.setup()

      await waitFor(() => render(<AuthPage />))
      const googleButton = validateGoogleBtn()

      await user.click(googleButton)

      const errorBox = await screen.findByTestId('error-msg')

      expect(errorBox).toHaveTextContent(errorMsg)
    })

    it('Should sign in with Google successfully  ', async () => {
      const firebaseUserMock = makeFbUser()
      const userMock = parseToUser(firebaseUserMock) as User

      jest.spyOn(authStore, 'signInWithGoogle').mockResolvedValue(userMock)

      const {user} = await makeSUT()

      const googleButton = validateGoogleBtn()
      await user.click(googleButton)

      expect(mockRouter).toMatchObject({
        asPath: '/admin',
        pathname: '/admin',
        query: {},
      })
    })
  })

  describe('sign in with gitHub', () => {
    it('should sign in with github successfully', async () => {
      const userMock = makeUser()

      jest.spyOn(authStore, 'signInWithGithub').mockResolvedValue(userMock)

      const {user} = await makeSUT()
      const githubBtn = validateGithubBtn()

      await user.click(githubBtn)

      expect(mockRouter).toMatchObject({
        asPath: '/admin',
        pathname: '/admin',
      })
    })
    it('should return an error when tried to sign in with github', async () => {
      jest.spyOn(authStore, 'signInWithGithub').mockRejectedValue('error')

      const {user} = await makeSUT()
      const githubBtn = validateGithubBtn()

      await user.click(githubBtn)

      const errorMsg = screen.getByTestId('error-msg')

      expect(errorMsg).toBeInTheDocument()
      expect(mockRouter).toMatchObject({asPath: '/auth', pathname: '/auth'})
    })
  })
})

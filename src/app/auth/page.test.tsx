import mockRouter from 'next-router-mock'

import {makeFbUser, makeUser, makeUserTheme, setup} from '@/__tests__'
import {authStore} from '@/app/auth/context/auth-store'
import AuthLayout from '@/app/auth/layout'
import AuthPage from '@/app/auth/page'
import {User} from '@/domain/models'
import {parseToUser} from '@/utils/user'
import {faker} from '@faker-js/faker'
import {screen, cleanup, waitFor} from '@testing-library/react'

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
  const githubButton = screen.getByText(/Sign in with GitHub/i)
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

    await waitFor(async () => {
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
  })

  describe('sign in with email', () => {
    it('should sign in with email successfully', async () => {
      jest.spyOn(authStore, 'signInWithEmailAndPassword').mockResolvedValue()

      const {user} = await makeSUT()
      await waitFor(async () => {
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
    })

    it('should return an error when tried to sign in with email', async () => {
      jest
        .spyOn(authStore, 'signInWithEmailAndPassword')
        .mockRejectedValue('error message')

      const {user} = await makeSUT()
      await waitFor(async () => {
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
      })
    })
  })

  describe('Sign in with google', () => {
    it('Should return an error when clicked to Login with Google', async () => {
      const errorMsg = 'error message'
      jest.spyOn(authStore, 'signInWithGoogle').mockRejectedValue(errorMsg)

      const {user} = await makeSUT()

      await waitFor(async () => {
        const googleButton = validateGoogleBtn()

        await user.click(googleButton)

        const errorBox = await screen.findByTestId('error-msg')

        expect(errorBox).toHaveTextContent(errorMsg)
      })
    })

    it('Should sign in with Google successfully  ', async () => {
      const firebaseUserMock = makeFbUser()
      parseToUser(firebaseUserMock, makeUserTheme()) as User

      jest.spyOn(authStore, 'signInWithGoogle').mockResolvedValue()

      const {user} = await makeSUT()

      await waitFor(async () => {
        const googleButton = validateGoogleBtn()
        await user.click(googleButton)

        expect(mockRouter).toMatchObject({
          asPath: '/admin',
          pathname: '/admin',
          query: {},
        })
      })
    })
  })

  describe('sign in with gitHub', () => {
    it('should sign in with github successfully', async () => {
      makeUser()

      jest.spyOn(authStore, 'signInWithGithub').mockResolvedValue()

      const {user} = await makeSUT()
      await waitFor(async () => {
        const githubBtn = validateGithubBtn()

        await user.click(githubBtn)

        expect(mockRouter).toMatchObject({
          asPath: '/admin',
          pathname: '/admin',
        })
      })
    })

    it('should return an error when tried to sign in with github', async () => {
      mockRouter.push('/auth')

      jest.spyOn(authStore, 'signInWithGithub').mockRejectedValue('error')

      const {user} = await makeSUT()

      await waitFor(async () => {
        const githubBtn = validateGithubBtn()

        await user.click(githubBtn)

        const errorMsg = screen.getByTestId('error-msg')

        expect(errorMsg).toBeInTheDocument()
        expect(errorMsg).toHaveTextContent('error')

        expect(mockRouter).toMatchObject({asPath: '/auth', pathname: '/auth'})
      })
    })
  })
})

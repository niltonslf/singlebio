import {setup} from '@/__tests__'
import {authStore} from '@/app/auth/context/auth-store'
import RegisterPage from '@/app/auth/register/page'
import {faker} from '@faker-js/faker'
import {cleanup, screen} from '@testing-library/react'

const makeSUT = () => {
  return setup(<RegisterPage />)
}

describe('Sign up', () => {
  beforeEach(cleanup)

  it('should sign up user successfully', async () => {
    jest.spyOn(authStore, 'createWithEmailAndPassword').mockResolvedValue()

    const {user} = makeSUT()

    const nameInput = screen.getByPlaceholderText(/name/i)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const signUpButton = screen.getByRole('button', {name: /sign up/i})

    const nameMock = faker.internet.displayName()
    const emailMock = faker.internet.email()
    const passwordMock = faker.internet.password({length: 8})

    await user.type(nameInput, nameMock)
    await user.type(emailInput, emailMock)
    await user.type(passwordInput, passwordMock)

    await user.click(signUpButton)

    expect(authStore.createWithEmailAndPassword).toHaveBeenCalledWith({
      displayName: nameMock,
      email: emailMock,
      password: passwordMock,
    })
  })

  it('should show error message if fail', async () => {
    jest
      .spyOn(authStore, 'createWithEmailAndPassword')
      .mockRejectedValue('error message')

    const {user} = makeSUT()

    const nameInput = screen.getByPlaceholderText(/name/i)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const signUpButton = screen.getByRole('button', {name: /sign up/i})
    const errorBox = screen.getByTestId('register-error-box')

    const nameMock = faker.internet.displayName()
    const emailMock = faker.internet.email()
    const passwordMock = faker.internet.password({length: 8})

    await user.type(nameInput, nameMock)
    await user.type(emailInput, emailMock)
    await user.type(passwordInput, passwordMock)

    await user.click(signUpButton)

    expect(errorBox).toHaveTextContent('error message')
  })
})

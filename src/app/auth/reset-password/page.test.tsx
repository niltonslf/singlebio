import {setup} from '@/__tests__'
import {authStore} from '@/app/auth/context/auth-store'
import ResetPasswordPage from '@/app/auth/reset-password/page'
import {faker} from '@faker-js/faker'
import {cleanup, screen} from '@testing-library/react'

const makeSUT = () => {
  return setup(<ResetPasswordPage />)
}

describe('Reset password', () => {
  beforeEach(cleanup)

  it('should send reset email successfully', async () => {
    jest.spyOn(authStore, 'resetPassword').mockResolvedValue()

    const {user} = makeSUT()

    const emailInput = screen.getByRole('textbox')
    const resetButton = screen.getByRole('button', {name: /reset password/i})

    const emailMock = faker.internet.email()

    await user.type(emailInput, emailMock)
    await user.click(resetButton)

    expect(authStore.resetPassword).toHaveBeenCalledWith(emailMock)
  })
})

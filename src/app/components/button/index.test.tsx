import routerMock from 'next-router-mock'

import {setup} from '@/__tests__/__helpers__'
import {Button, ButtonVariants} from '@/app/components'
import {screen} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/admin'),
}))

const makeSUT = (
  onClick?: () => void,
  variant?: ButtonVariants,
  isLoading?: boolean,
) => {
  return setup(
    <Button isLoading={isLoading} onClick={onClick} variant={variant}>
      Click me
    </Button>,
  )
}

describe('Button component', () => {
  it('Should render primary button', () => {
    makeSUT(undefined)

    const button = screen.getByRole('button')

    expect(button).toBeVisible()
    expect(button).toHaveTextContent(/Click me/i)
  })

  it('should render button with onClick action', async () => {
    routerMock.pathname = '/'

    const {user} = makeSUT(() => routerMock.push('/new-page'))

    const button = screen.getByRole('button')

    await user.click(button)

    expect(routerMock.pathname).toBe('/new-page')
  })

  it('should render button with isLoading', () => {
    makeSUT(undefined, undefined, true)

    const button = screen.getByRole('button')
    const svg = button.querySelector('svg')

    expect(svg).toBeVisible()
  })
})

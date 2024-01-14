import HomePage from '@/app/page'
import {render, screen} from '@testing-library/react'

describe('Home Page', () => {
  it('render home page', () => {
    render(<HomePage />)

    const brand = screen.getByRole('img', {name: /logo/i})
    expect(brand).toBeInTheDocument()

    const accessButton = screen.getByText(/login/i)
    const text = screen.getByRole('heading')
    const tryButton = screen.getByText(/create my page/i)

    expect(accessButton).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(tryButton).toBeInTheDocument()
  })
})

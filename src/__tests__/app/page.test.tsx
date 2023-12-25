import HomePage from '@/app/page'
import {render, screen} from '@testing-library/react'

describe('Home Page', () => {
  it('render home page', () => {
    render(<HomePage />)

    const brand = screen.getByRole('img')
    expect(brand).toBeInTheDocument()

    const accessButton = screen.getByText('Access')
    const text = screen.getByRole('heading')
    const tryButton = screen.getByText('Try it now')

    expect(accessButton).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(tryButton).toBeInTheDocument()
  })
})

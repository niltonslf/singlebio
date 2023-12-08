import '@testing-library/jest-dom'
import HomePage from '@/app/page'
import {render, screen} from '@testing-library/react'

describe('Home Page', () => {
  it('render home page', () => {
    render(<HomePage />)

    const brand = screen.getByText('/share@LnkTree')
    expect(brand).toBeInTheDocument()

    const accessButton = screen.getByText('Access')
    expect(accessButton).toBeInTheDocument()

    const text = screen.getByRole('heading')
    expect(text).toBeInTheDocument()

    const tryButton = screen.getByText('Try it now')
    expect(tryButton).toBeInTheDocument()
  })
})

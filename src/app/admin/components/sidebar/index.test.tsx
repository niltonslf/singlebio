import {setup} from '@/__tests__'
import {Sidebar} from '@/app/admin/components'
import {screen} from '@testing-library/react'

const makeSUT = () => {
  return setup(<Sidebar />)
}

describe('Sidebar component', () => {
  it('should render sidebar', () => {
    makeSUT()

    const logos = screen.getAllByRole('img')
    const mobileBtn = screen.getByTestId('sidebar-toggle-button')
    const navLinksWrapper = screen.getByTestId('nav-links')

    expect(logos.length).toBe(2)
    expect(mobileBtn).toBeInTheDocument()
    expect(navLinksWrapper).toBeInTheDocument()
  })
})

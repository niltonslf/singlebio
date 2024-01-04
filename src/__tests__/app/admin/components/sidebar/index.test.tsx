import {setup} from '@/__tests__/__helpers__'
import {Sidebar} from '@/app/admin/components'
import {screen} from '@testing-library/react'

const makeSUT = () => {
  return setup(<Sidebar isOpen={true} onClose={() => null} />)
}

describe('Sidebar component', () => {
  it('should render sidebar', () => {
    makeSUT()

    const logo = screen.getByRole('img')
    const mobileBtn = screen.getByRole('button')
    const menuSections = document.querySelectorAll('nav > div > div')

    expect(logo).toBeVisible()
    expect(mobileBtn).toBeInTheDocument()
    expect(menuSections).toHaveLength(3)
  })
})

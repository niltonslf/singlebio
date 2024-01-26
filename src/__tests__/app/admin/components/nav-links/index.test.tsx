import {setup} from '@/__tests__/__helpers__'
import {NavLinks} from '@/app/admin/components'
import {screen} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/admin/links'),
}))

const makeSUT = () => {
  return setup(<NavLinks />)
}

describe('NavLinks component', () => {
  it('should all links sections', () => {
    makeSUT()

    const sections = screen.getAllByRole('link')
    const homeLink = sections[0]

    expect(homeLink).toHaveAttribute('href', '/admin/links')
  })
})

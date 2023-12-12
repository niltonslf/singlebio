import {Dropdown} from '@/app/admin/components'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

describe('Dropdown', () => {
  it('should render component', async () => {
    render(
      <Dropdown>
        <button>open dropdown</button>
      </Dropdown>,
    )

    const triggerItem = screen.getByRole('button')
    const menuContainer = screen.getByRole('list')

    expect(triggerItem).toBeInTheDocument()
    expect(menuContainer).toBeInTheDocument()
    expect(menuContainer.children).toHaveLength(2)
  })

  it.todo('should open dropdown')

  it.todo('should close menu when clicked outside')

  it.todo('should call deleteAccount function')
})

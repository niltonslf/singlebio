import {Dropdown} from '@/app/admin/components'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

  it('should open dropdown', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown>
        <button>open dropdown</button>
      </Dropdown>,
    )

    const triggerItem = screen.getByRole('button')
    const menuContainer = screen.getByRole('list')
    let hasHidden = menuContainer.parentElement?.classList.contains('hidden')

    expect(hasHidden).toBe(true)

    await user.click(triggerItem)

    hasHidden = menuContainer.parentElement?.classList.contains('hidden')

    expect(hasHidden).toBe(false)
    expect(menuContainer.children).toHaveLength(2)
  })

  it.todo('should close menu when clicked outside')

  it.todo('should call deleteAccount function')
})

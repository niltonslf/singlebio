import {Dropdown} from '@/app/admin/components'
import '@testing-library/jest-dom'
import {cleanup, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const handleMenuContainer = () => {
  const menuContainer = screen.getByRole('list')
  let hasHidden = menuContainer.parentElement?.classList.contains('hidden')

  return {
    hasHidden,
    menuContainer,
  }
}

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup()
  })

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

  it('should close menu when clicked outside', async () => {
    const user = userEvent.setup()

    const {baseElement} = render(
      <Dropdown>
        <button>open dropdown</button>
      </Dropdown>,
    )

    const triggerItem = screen.getByRole('button')
    const {hasHidden} = handleMenuContainer()

    expect(hasHidden).toBe(true)

    await user.click(triggerItem)
    const {hasHidden: hasHidden2, menuContainer} = handleMenuContainer()

    expect(hasHidden2).toBe(false)
    expect(menuContainer.children).toHaveLength(2)

    await user.click(baseElement)
    const {hasHidden: hasHidden3} = handleMenuContainer()

    expect(hasHidden3).toBe(true)
  })

  it.todo('should go to link')

  it.todo('should call deleteAccount function')
})

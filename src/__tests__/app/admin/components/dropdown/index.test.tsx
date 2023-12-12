import {makeUser} from '@/__tests__/utils'
import {Dropdown} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import '@testing-library/jest-dom'
import {cleanup, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const makeSUT = () => {
  return render(
    <Dropdown>
      <button>open dropdown</button>
    </Dropdown>,
  )
}

const handleMenuContainer = () => {
  const menuList = screen.getByRole('list')
  let hasHidden = menuList.parentElement?.classList.contains('hidden')

  return {
    hasHidden,
    menuList,
  }
}

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  it('should render component', async () => {
    makeSUT()

    const triggerItem = screen.getByRole('button')
    const menuList = screen.getByRole('list')

    expect(triggerItem).toBeInTheDocument()
    expect(menuList).toBeInTheDocument()
    expect(menuList.children).toHaveLength(2)
  })

  it('should open dropdown', async () => {
    const user = userEvent.setup()

    makeSUT()

    const triggerItem = screen.getByRole('button')
    const menuList = screen.getByRole('list')
    let hasHidden = menuList.parentElement?.classList.contains('hidden')

    expect(hasHidden).toBe(true)

    await user.click(triggerItem)

    hasHidden = menuList.parentElement?.classList.contains('hidden')

    expect(hasHidden).toBe(false)
    expect(menuList.children).toHaveLength(2)
  })

  it('should close menu when clicked outside', async () => {
    const user = userEvent.setup()

    const {baseElement} = makeSUT()

    const triggerItem = screen.getByRole('button')
    const {hasHidden} = handleMenuContainer()

    expect(hasHidden).toBe(true)

    await user.click(triggerItem)
    const {hasHidden: hasHidden2, menuList} = handleMenuContainer()

    expect(hasHidden2).toBe(false)
    expect(menuList.children).toHaveLength(2)

    await user.click(baseElement)
    const {hasHidden: hasHidden3} = handleMenuContainer()

    expect(hasHidden3).toBe(true)
  })

  it('should the first item has the correct link', async () => {
    const user = userEvent.setup()

    authStore.user = makeUser()
    const path = `/${authStore.user.userName}`

    makeSUT()

    const {menuList} = handleMenuContainer()

    // select first li
    const firstItem = menuList.children[0]
    const link = firstItem.firstElementChild

    if (!link) return fail()

    expect(link).toHaveAttribute('href', path)
  })

  it.todo('should call deleteAccount function')
})

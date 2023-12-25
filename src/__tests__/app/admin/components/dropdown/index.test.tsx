import {fail, makeUser} from '@/__tests__/utils'
import {Dropdown} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import {cleanup, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

const makeSUT = () => {
  return render(
    <Dropdown>
      <button>open dropdown</button>
    </Dropdown>,
  )
}

const handleMenuContainer = () => {
  const menuList = screen.getByRole('list')
  let menuHidden = menuList.parentElement?.classList.contains('hidden')

  return {menuHidden, menuList}
}

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  it('should render component', async () => {
    makeSUT()

    const triggerItem = screen.getByRole('button')
    const {menuList} = handleMenuContainer()
    const items = menuList.querySelectorAll('li')

    expect(triggerItem).toBeInTheDocument()
    expect(menuList).toBeInTheDocument()
    expect(items).toHaveLength(4)
  })

  it('should open dropdown', async () => {
    const user = userEvent.setup()

    makeSUT()

    const triggerItem = screen.getByRole('button')
    const {menuHidden} = handleMenuContainer()

    expect(menuHidden).toBe(true)

    await user.click(triggerItem)

    const {menuHidden: menuHidden2} = handleMenuContainer()

    expect(menuHidden2).toBe(false)
  })

  it('should close menu when clicked outside', async () => {
    const user = userEvent.setup()

    const {baseElement} = makeSUT()

    const triggerItem = screen.getByRole('button')
    const {menuHidden, menuList} = handleMenuContainer()

    // dropdown hidden
    expect(menuHidden).toBe(true)

    // open dropdown
    await user.click(triggerItem)

    const {menuHidden: menuHidden2} = handleMenuContainer()

    // check if dropdown is visible
    expect(menuHidden2).toBe(false)

    // don't close when clicked in a element inside the dropdown
    const {menuHidden: menuHidden3} = handleMenuContainer()

    // testing clicking on the list
    await user.click(menuList)
    expect(menuHidden3).toBe(false)

    // testing clicking on the list container
    const {menuHidden: menuHidden4} = handleMenuContainer()
    const menulistContainer = menuList.parentElement

    if (!menulistContainer) return fail()

    await user.click(menulistContainer)
    expect(menuHidden4).toBe(false)

    // click outside
    await user.click(baseElement)
    const {menuHidden: menuHidden5} = handleMenuContainer()

    // check if dropdown is hidden
    expect(menuHidden5).toBe(true)
  })

  it('should the first item has the correct link', async () => {
    userEvent.setup()

    authStore.userModel = makeUser()
    const path = `/${authStore?.user?.username}`

    makeSUT()

    const {menuList} = handleMenuContainer()
    const items = menuList.querySelectorAll('li')

    // select first li
    const firstItem = items[1]
    const link = firstItem.firstElementChild

    if (!link) return fail()

    expect(link).toHaveAttribute('href', path)
  })

  it('should call deleteAccount function', async () => {
    const user = userEvent.setup()

    jest.spyOn(authStore, 'deleteUser').mockImplementation()

    makeSUT()

    const {menuList} = handleMenuContainer()
    const items = menuList.querySelectorAll('li')

    const secondItem = items[2]
    const deleteAccountItem = secondItem.firstElementChild

    if (!deleteAccountItem) return fail()

    await user.click(deleteAccountItem)

    expect(authStore.deleteUser).toHaveBeenCalledTimes(1)
  })
})

import {fail, setup} from '@/__tests__/__helpers__'
import {Dropdown} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import {cleanup, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

const makeSUT = () => {
  return setup(
    <Dropdown>
      <button>open dropdown</button>
    </Dropdown>,
  )
}

const getMenuElements = () => {
  const dropdown = screen.getByTestId('header-dropdown')
  const menuList = dropdown.querySelector('div')

  return {dropdown, menuList}
}

describe('Dropdown', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  it('should dropdown component', async () => {
    makeSUT()

    const triggerItem = screen.getByText('open dropdown')
    const {menuList} = getMenuElements()
    const items = menuList?.querySelectorAll('span')

    if (!menuList) return fail()

    expect(triggerItem).toBeInTheDocument()
    expect(menuList).toBeInTheDocument()
    expect(items).toHaveLength(2)
  })

  it('should call deleteAccount function', async () => {
    const user = userEvent.setup()

    jest.spyOn(authStore, 'deleteUser').mockImplementation()

    makeSUT()

    const {menuList} = getMenuElements()
    const items = menuList?.querySelectorAll('span')

    const deleteItem = items?.[0]

    if (!deleteItem) return fail()

    await user.click(deleteItem)

    expect(authStore.deleteUser).toHaveBeenCalledTimes(1)
  })
})

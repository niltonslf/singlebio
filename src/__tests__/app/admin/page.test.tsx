import * as firestore from 'firebase/firestore'

import {
  handlePageAuthentication,
  makeFbUser,
  makeGetDocsResponse,
  setup,
} from '@/__tests__/__helpers__'
import {adminStore} from '@/app/admin/context/admin-store'
import AdminLayoutWrapper from '@/app/admin/layout'
import AdminPage from '@/app/admin/page'
import {authStore} from '@/app/auth/context/auth-store'
import {parseUserPageUrl} from '@/utils'
import {faker} from '@faker-js/faker'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  onSnapshot: jest.fn(() => jest.fn()),
}))

const makeSUT = async () => {
  return setup(
    <AdminLayoutWrapper>
      <AdminPage />
    </AdminLayoutWrapper>,
  )
}

describe('Admin page', () => {
  afterEach(() => {
    cleanup()
  })
  it('should render page with sidebar, header, links form and smartphone', async () => {
    const userMock = makeFbUser()
    handlePageAuthentication(userMock, faker.internet.userName())
    await makeSUT()

    await waitFor(async () => {
      const sidebar = await screen.getByTestId('admin-sidebar')
      const header = await screen.getByTestId('admin-header')
      const linkForm = await screen.queryByText(/Add link/i)
      const smartphone = await document.querySelector('iframe')

      expect(sidebar).toBeInTheDocument()
      expect(header).toBeInTheDocument()
      expect(linkForm).toBeInTheDocument()
      expect(smartphone).toBeInTheDocument()
      expect(smartphone).toHaveAttribute(
        'src',
        parseUserPageUrl(adminStore.user?.username),
      )
    })
  })

  it('should show modal to set the username on the first login', async () => {
    // simulate user authenticated
    handlePageAuthentication(makeFbUser())
    // simulate username available
    const getDocsRes = makeGetDocsResponse({})
    jest.spyOn(firestore, 'getDocs').mockResolvedValue(getDocsRes)
    // spy method that saves username
    jest.spyOn(authStore, 'updateUser').mockImplementation()

    const {user} = await waitFor(() => makeSUT())

    await waitFor(async () => {
      const modalHeader = screen.getByText(/Choose your username/i)
      const modal = modalHeader.parentElement?.parentElement

      await waitFor(() => {})

      // modal should be visible
      expect(modal?.classList.contains('modal-open')).toBe(true)

      const usernameInput = modalHeader.parentElement?.querySelector('input')
      const usernameSubmit = modalHeader.parentElement?.querySelector('button')

      if (!usernameInput || !usernameSubmit) return fail()

      await user.type(usernameInput, 'some-username')
      await user.click(usernameSubmit)

      expect(authStore.updateUser).toHaveBeenCalledTimes(1)
      expect(modal?.classList.contains('some-username')).toBe(false)
    })
  })
})

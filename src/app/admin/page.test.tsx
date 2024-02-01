import {
  handlePageAuthentication,
  makeFbUser,
  makeUser,
  setup,
} from '@/__tests__'
import AdminLayout from '@/app/admin/layout'
import AdminPage from '@/app/admin/page'
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
}))

jest.mock('@/app/admin/context/admin-store', () => ({
  __esModule: true,
  adminStore: {
    pageLinks: [],
    setUser: jest.fn(),
    fetchData: jest.fn(),
    user: makeUser(),
  },
}))

const makeSUT = async () => {
  return setup(
    <AdminLayout>
      <AdminPage />
    </AdminLayout>,
  )
}

describe('Admin page', () => {
  afterEach(() => {
    cleanup()
  })
  it('should render page with sidebar, links form and page preview', async () => {
    const userMock = makeFbUser()
    handlePageAuthentication(userMock, faker.internet.userName())
    await makeSUT()

    await waitFor(async () => {
      const sidebar = await screen.getByTestId('admin-sidebar')
      const linkForm = await screen.queryByText(/Add link/i)
      const pagePreview = await screen.getByTestId('admin-page-preview')

      expect(sidebar).toBeInTheDocument()
      expect(linkForm).toBeInTheDocument()
      expect(pagePreview).toBeInTheDocument()
    })
  })

  it.todo('should show modal to set the username on the first login')
})

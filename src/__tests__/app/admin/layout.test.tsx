import routerMock from 'next-router-mock'

import {handlePageAuthentication, setup} from '@/__tests__/__helpers__'
import AdminLayoutWrapper from '@/app/admin/layout'
import {cleanup, waitFor} from '@testing-library/react'

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
  return await waitFor(() =>
    setup(
      <AdminLayoutWrapper>
        <p>children</p>
      </AdminLayoutWrapper>,
    ),
  )
}

describe('Admin Layout', () => {
  afterEach(() => {
    cleanup()
  })

  it('should redirect to /auth if not authenticated', async () => {
    handlePageAuthentication(undefined)

    await makeSUT()

    await waitFor(() => {
      expect(routerMock).toMatchObject({
        asPath: '/auth',
        pathname: '/auth',
        query: {},
      })
    })
  })
})

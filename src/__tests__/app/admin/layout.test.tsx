import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import routerMock from 'next-router-mock'

import {makeGetDocsResponse, setup} from '@/__tests__/__helpers__'
import AdminLayout from '@/app/admin/layout'
import {parseToUser} from '@/utils/user'
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
      <AdminLayout>
        <p>children</p>
      </AdminLayout>,
    ),
  )
}

const handlePageAuthentication = (
  fbUserMock: firebaseAuth.User | undefined,
  username?: string,
) => {
  const data = fbUserMock ? parseToUser(fbUserMock, username) : undefined
  jest
    .spyOn(firebaseAuth, 'onAuthStateChanged')
    .mockImplementation((auth: any, userCallback: any) => {
      userCallback(fbUserMock)
      return jest.fn()
    })

  jest.spyOn(firestore, 'doc').mockImplementation()

  jest
    .spyOn(firestore, 'getDoc')
    .mockResolvedValue(makeGetDocsResponse({data, exists: true}))
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

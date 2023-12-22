import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import routerMock from 'next-router-mock'

import {
  TransitionRoot,
  createReturnChildren,
  makeFbUser,
  makeGetDocsResponse,
  setup,
} from '@/__tests__/utils'
import {SmartphoneProvider} from '@/app/admin/context/smartphone-context'
import AdminLayout from '@/app/admin/layout'
import AdminPage from '@/app/admin/page'
import '@testing-library/jest-dom'
import {AuthStore, authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils/user'
import {faker} from '@faker-js/faker'
import {act, cleanup, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

jest.mock('@headlessui/react', () => {
  return {
    ...jest.requireActual('@headlessui/react'),
    Dialog: Object.assign(createReturnChildren(), {
      Title: createReturnChildren(),
      Panel: createReturnChildren(),
    }),
    Transition: Object.assign(TransitionRoot, {
      Child: createReturnChildren(),
      Root: TransitionRoot,
    }),
  }
})

jest.mock('@/app/admin/context/smartphone-context', () => {
  return {
    ...jest.requireActual('@/app/admin/context/smartphone-context'),
    useAdmin: () => {
      return {
        reloadSmartphoneList: jest.fn(),
      }
    },
  }
})

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  onSnapshot: jest.fn(() => jest.fn()),
}))

const fetchFirebaseUserCopy = AuthStore.prototype['fetchFirebaseUser']

const makeSUT = async () => {
  return await waitFor(() =>
    setup(
      <AdminLayout>
        <SmartphoneProvider>
          <AdminPage />
        </SmartphoneProvider>
      </AdminLayout>,
    ),
  )
}

const handlePageAuthentication = (
  fbUserMock: firebaseAuth.User | undefined,
) => {
  const data = fbUserMock
    ? parseToUser(fbUserMock, faker.internet.userName())
    : undefined
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

describe('Admin page', () => {
  beforeEach(() => {
    cleanup()
    act(() => authStore.clearUser())
    AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserCopy
    return
  })
  it('should render page with all sections', async () => {
    const userMock = makeFbUser()

    handlePageAuthentication(userMock)

    await makeSUT()

    const userPageUrl = `/${authStore.user?.username}`

    await waitFor(async () => {
      const header = await screen.getByTestId('admin-header')
      const formButton = await screen.queryByText(/Add link/i)
      const iframe = await document.querySelector('iframe')

      expect(header).toBeInTheDocument()
      expect(formButton).toBeInTheDocument()
      expect(formButton).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', userPageUrl)
      expect(iframe).toBeVisible()
    })
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

  it('should call method to save username on the first login', async () => {
    const user = userEvent.setup()
    const fbUserMock = makeFbUser()
    const userMock = parseToUser(fbUserMock)
    const usernameMock = faker.internet.userName()

    handlePageAuthentication(fbUserMock)

    jest.spyOn(firestore, 'updateDoc').mockImplementation()

    AuthStore.prototype['fetchFirebaseUser'] = () =>
      Promise.resolve({exists: true, user: userMock})

    await makeSUT()

    const usernameInput =
      await screen.findByPlaceholderText(/Type your username/i)
    const saveButton = await screen.findByText(/save/i)

    await user.type(usernameInput, usernameMock)
    expect(usernameInput).toHaveValue(usernameMock)

    await user.click(saveButton)

    expect(firestore.updateDoc).toHaveBeenCalledTimes(1)
    expect(firestore.updateDoc).toHaveBeenCalledWith(undefined, {
      username: usernameMock,
    })
  })
})

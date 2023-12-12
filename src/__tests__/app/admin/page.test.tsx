import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'
import routerMock from 'next-router-mock'

import {
  TransitionRoot,
  createReturnChildren,
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
  setup,
} from '@/__tests__/utils'
import AdminLayout from '@/app/admin/layout'
import AdminPage from '@/app/admin/page'
import {AuthStore, authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils/user'
import {cleanup, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import {faker} from '@faker-js/faker'

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

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  onSnapshot: jest.fn(args => jest.fn()),
}))

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

const fetchFirebaseUserCopy = AuthStore.prototype['fetchFirebaseUser']

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

afterAll(() => {
  AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserCopy
})

describe('Admin page', () => {
  it('render page with all sections', async () => {
    const userMock = makeUser()

    jest
      .spyOn(firebaseAuth, 'onAuthStateChanged')
      .mockImplementation((auth: any, userCallback: any) => {
        userCallback(userMock)
        return jest.fn()
      })

    jest
      .spyOn(firestore, 'getDoc')
      .mockResolvedValue(makeGetDocsResponse({data: userMock, exists: true}))

    jest.spyOn(authStore, 'authUser')

    await waitFor(() => setup(<AdminPage />))

    await waitFor(async () => {
      const header = await screen.queryByText('Lnktree admin')
      const formButton = await screen.queryByText('Add link')
      const linksList = await screen.queryByLabelText('link-list')

      expect(header).toBeInTheDocument()
      expect(formButton).toBeInTheDocument()
      expect(formButton).toHaveTextContent(/Add link/i)
      expect(linksList?.children).toHaveLength(0)
    })
  })

  it('should redirect to /auth if not authenticated', async () => {
    jest
      .spyOn(firebaseAuth, 'onAuthStateChanged')
      .mockImplementationOnce((auth: any, userCallback: any) => {
        userCallback(null)
        return jest.fn()
      })

    await waitFor(() =>
      render(
        <AdminLayout>
          <AdminPage />
        </AdminLayout>,
      ),
    )

    await waitFor(() => {
      expect(routerMock).toMatchObject({
        asPath: '/auth',
        pathname: '/auth',
        query: {},
      })
    })
  })

  it('should call method to save username', async () => {
    const user = userEvent.setup()
    const fbUserMock = makeFbUser()
    const userMock = parseToUser(fbUserMock)
    const usernameMock = faker.internet.userName()

    jest
      .spyOn(firebaseAuth, 'onAuthStateChanged')
      .mockImplementation((auth: any, userCallback: any) => {
        userCallback(fbUserMock)
        return jest.fn()
      })

    jest.spyOn(firestore, 'doc').mockImplementation()
    jest.spyOn(firestore, 'updateDoc').mockImplementation()

    AuthStore.prototype['fetchFirebaseUser'] = args =>
      Promise.resolve({exists: true, user: userMock})

    await waitFor(() => render(<AdminPage />))

    const usernameInput =
      await screen.findByPlaceholderText(/Type your username/i)
    const saveButton = await screen.findByText(/save/i)

    await user.type(usernameInput, usernameMock)
    expect(usernameInput).toHaveValue(usernameMock)

    await user.click(saveButton)

    expect(firestore.updateDoc).toHaveBeenCalledTimes(1)
    expect(firestore.updateDoc).toHaveBeenCalledWith(undefined, {
      userName: usernameMock,
    })
  })

  // it("should add a new link" , () => {})
})

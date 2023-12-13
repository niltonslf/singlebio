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
import AdminLayout from '@/app/admin/layout'
import AdminPage from '@/app/admin/page'
import '@testing-library/jest-dom'
import {AuthStore, authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils/user'
import {faker} from '@faker-js/faker'
import {act, cleanup, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

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

const fetchFirebaseUserCopy = AuthStore.prototype['fetchFirebaseUser']

const handlePageAuthentication = (
  fbUserMock: firebaseAuth.User | undefined,
) => {
  const data = fbUserMock ? parseToUser(fbUserMock) : undefined

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
    // jest.clearAllMocks()
    // jest.restoreAllMocks()
    cleanup()
    act(() => authStore.clearUser())
    AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserCopy
    return
  })
  it('should render page with all sections', async () => {
    const userMock = makeFbUser()

    handlePageAuthentication(userMock)

    await waitFor(() => setup(<AdminPage />))

    const userPageUrl = `${authStore.user?.userName}`

    await waitFor(async () => {
      const header = await screen.queryByText('Lnktree admin')
      const formButton = await screen.queryByText('Add link')
      const iframe = await document.querySelector('iframe')

      expect(header).toBeInTheDocument()
      expect(formButton).toBeInTheDocument()
      expect(formButton).toHaveTextContent(/Add link/i)
      expect(iframe).toHaveAttribute('src', userPageUrl)
      expect(iframe).toBeVisible()
    })
  })

  it('should redirect to /auth if not authenticated', async () => {
    handlePageAuthentication(undefined)

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

    handlePageAuthentication(fbUserMock)

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

  it('should call method to add a new link', async () => {
    const user = userEvent.setup()
    const fbUserMock = makeFbUser()
    const linkMock = {
      label: faker.internet.userName(),
      url: faker.internet.url(),
    }

    handlePageAuthentication(fbUserMock)

    jest.spyOn(firestore, 'doc').mockImplementation()
    jest.spyOn(firestore, 'collection').mockImplementation()
    jest.spyOn(firestore, 'addDoc').mockImplementation()

    await waitFor(() => render(<AdminPage />))

    const urlInput = await screen.findByPlaceholderText(/Type the url/i)
    const labelInput = await screen.findByPlaceholderText(/Type the label/i)
    const formButton = await screen.findByText('Add link')

    await user.type(urlInput, linkMock.url)
    await user.type(labelInput, linkMock.label)

    expect(urlInput).toHaveValue(linkMock.url)
    expect(labelInput).toHaveValue(linkMock.label)

    await user.click(formButton)

    expect(urlInput).toHaveValue('')
    expect(labelInput).toHaveValue('')
  })
})

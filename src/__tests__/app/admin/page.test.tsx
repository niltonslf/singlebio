import 'next-router-mock'
import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {makeGetDocsResponse, makeUser, setup} from '@/__tests__/utils'
import AdminPage from '@/app/admin/page'
import {authStore} from '@/app/auth/context/auth-store'
import {cleanup, screen, waitFor} from '@testing-library/react'

import '@testing-library/jest-dom'

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

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
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
      const formButton = await screen.queryByRole('button')
      const linksList = await screen.queryByLabelText('link-list')

      expect(header).toBeInTheDocument()
      expect(formButton).toBeInTheDocument()
      expect(formButton).toHaveTextContent(/save/i)
      expect(linksList?.children).toHaveLength(0)
    })
  })
})

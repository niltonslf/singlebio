import * as firebaseAuth from 'firebase/auth'
import {User} from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {parseToUser} from '@/utils'

import {makeGetDocsResponse} from '.'

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}))

export const handlePageAuthentication = (
  fbUserMock: User | undefined,
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

import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
} from '@/__tests__/utils/mocks'
import {AuthStore, authStore} from '@/app/auth/context/auth-state'
import {parseToUser} from '@/utils/user'
import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/firestore')
jest.mock('firebase/auth')

afterAll(() => {
  cleanup()
  jest.clearAllMocks()
  authStore.user = undefined
  authStore.firebaseUser = undefined
})

const fetchFirebaseUserBackup = AuthStore.prototype['fetchFirebaseUser']

describe('AuthStore', () => {
  describe('authUser', () => {
    it('should authenticate the user - Account exists', async () => {
      const firebaseUser = makeFbUser()
      const user = makeUser()

      AuthStore.prototype['fetchFirebaseUser'] = args =>
        Promise.resolve({exists: true, user})

      await authStore.authUser(firebaseUser)

      expect({...authStore.user}).toStrictEqual(user)
      expect({...authStore.firebaseUser}).toStrictEqual(firebaseUser)
    })

    it('should authenticate the user - New account', async () => {
      const firebaseUser = makeFbUser()
      const user = {...parseToUser(firebaseUser), userName: ''}

      AuthStore.prototype['fetchFirebaseUser'] = args =>
        Promise.resolve({exists: false, user: makeUser()})

      await authStore.authUser(firebaseUser)

      // expect({...authStore.user}).toStrictEqual(user)
      expect({...authStore.firebaseUser}).toStrictEqual(firebaseUser)
    })
  })

  describe('fetchFirebaseUser', () => {
    it('should return an existent user', async () => {
      const firebaseUser = makeFbUser()

      AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserBackup

      jest
        .spyOn(firestore, 'doc')
        .mockReturnValue({} as firestore.DocumentReference)

      jest.spyOn(firestore, 'getDoc').mockResolvedValue({
        data: () => parseToUser(firebaseUser),
        exists: () => true,
      } as any)

      const {exists, user} = await authStore['fetchFirebaseUser'](firebaseUser)

      expect(exists).toBe(true)
      expect(user?.name).toBe(firebaseUser.displayName)
      expect(user?.email).toBe(firebaseUser.email)
      expect(user?.pictureUrl).toBe(firebaseUser.photoURL)
      expect(user?.uid).toBe(firebaseUser.uid)
    })

    it('should return an non existent user', async () => {
      const firebaseUser = makeFbUser()

      AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserBackup

      jest
        .spyOn(firestore, 'doc')
        .mockReturnValue({} as firestore.DocumentReference)

      jest
        .spyOn(firestore, 'getDoc')
        .mockResolvedValue(makeGetDocsResponse({exists: false}))

      const {exists, user} = await authStore['fetchFirebaseUser'](firebaseUser)

      expect(exists).toBe(false)
      expect(user).toBe(undefined)
    })
  })

  describe('updateUser', () => {
    it('Update user variable', () => {
      const user = makeUser()

      authStore.updateUser(user)

      expect(authStore.user).toStrictEqual(user)
    })
  })

  describe('clearUser', () => {
    it('Clear users variables', () => {
      authStore.clearUser()

      expect(authStore.user).toBe(undefined)
      expect(authStore.firebaseUser).toBe(undefined)
    })
  })

  describe('deleteUser', () => {
    it('delete user successfully', async () => {
      authStore.user = makeUser()

      jest.spyOn(firebaseAuth, 'getAuth').mockReturnValue({
        currentUser: {} as firebaseAuth.User,
      } as firebaseAuth.Auth)

      jest.spyOn(authStore, 'clearUser')

      await authStore.deleteUser()

      expect(firebaseAuth.reauthenticateWithPopup).toHaveBeenCalledTimes(1)
      expect(firebaseAuth.deleteUser).toHaveBeenCalledTimes(1)
      expect(firestore.deleteDoc).toHaveBeenCalledTimes(1)
      expect(authStore.clearUser).toHaveBeenCalledTimes(1)
      expect(authStore.firebaseUser).toBe(undefined)
      expect(authStore.user).toBe(undefined)
    })
  })
})

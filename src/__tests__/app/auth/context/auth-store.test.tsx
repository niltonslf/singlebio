import * as firestore from 'firebase/firestore'

import {makeFbUser, makeUser} from '@/__tests__/utils/mocks'
import {AuthStore, authStore} from '@/app/auth/context/auth-state'
import {parseToUser} from '@/utils/user'
import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/firestore')

afterAll(() => {
  cleanup()
  jest.clearAllMocks()
  authStore.user = undefined
  authStore.firebaseUser = undefined
})

const fetchFirebaseUserBackup = AuthStore.prototype['fetchFirebaseUser']

describe('AuthStore', () => {
  describe('AuthUser', () => {
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

      jest
        .spyOn(firestore, 'doc')
        .mockReturnValue({} as firestore.DocumentReference)

      jest.spyOn(firestore, 'getDoc').mockResolvedValue({
        data: () => parseToUser(firebaseUser),
        exists: () => true,
      } as any)

      AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserBackup

      const {exists, user} = await authStore['fetchFirebaseUser'](firebaseUser)

      expect(exists).toBe(true)
      expect(user?.name).toBe(firebaseUser.displayName)
      expect(user?.email).toBe(firebaseUser.email)
      expect(user?.pictureUrl).toBe(firebaseUser.photoURL)
      expect(user?.uid).toBe(firebaseUser.uid)
    })

    it('should return an non existent response', async () => {
      const firebaseUser = makeFbUser()

      jest
        .spyOn(firestore, 'doc')
        .mockReturnValue({} as firestore.DocumentReference)

      jest.spyOn(firestore, 'getDoc').mockResolvedValue({
        data: () => undefined,
        exists: () => false,
      } as any)

      AuthStore.prototype['fetchFirebaseUser'] = fetchFirebaseUserBackup

      const {exists, user} = await authStore['fetchFirebaseUser'](firebaseUser)

      expect(exists).toBe(false)
      expect(user).toBe(undefined)
    })
  })
})

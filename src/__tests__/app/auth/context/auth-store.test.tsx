import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
} from '@/__tests__/utils/mocks'
import {authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils/user'
import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/firestore')
jest.mock('firebase/auth')

afterAll(() => {
  cleanup()
  jest.clearAllMocks()
  authStore.setUser(undefined)
  authStore.firebaseUser = undefined
})

describe('AuthStore', () => {
  describe('authUser', () => {
    it('should authenticate the user - Account exists', async () => {
      const firebaseUser = makeFbUser()
      const user = makeUser()

      jest
        .spyOn(firestore, 'getDoc')
        .mockResolvedValue(makeGetDocsResponse({data: user, exists: true}))

      await authStore.authUser(firebaseUser)

      expect({...authStore.user}).toStrictEqual(user)
      expect({...authStore.firebaseUser}).toStrictEqual(firebaseUser)
    })

    it('should authenticate the user - New account', async () => {
      const firebaseUser = makeFbUser()
      const user = {...parseToUser(firebaseUser), username: ''}

      jest
        .spyOn(firestore, 'getDoc')
        .mockResolvedValue(makeGetDocsResponse({data: user, exists: true}))

      await authStore.authUser(firebaseUser)

      expect({...authStore.user}).toStrictEqual(user)
      expect({...authStore.firebaseUser}).toStrictEqual(firebaseUser)
    })

    it('should logout user if param is null', async () => {
      const firebaseUser = null

      jest.spyOn(authStore, 'authUser')

      authStore.authUser(firebaseUser)

      expect(authStore.authUser).toHaveBeenCalledWith(firebaseUser)
      expect(authStore.user).toBe(undefined)
      expect(authStore.firebaseUser).toBe(undefined)
    })
  })

  describe('updateUser', () => {
    it('Update user variable', () => {
      const user = makeUser()

      authStore.setUser(user)

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
      authStore.userModel = makeUser()

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

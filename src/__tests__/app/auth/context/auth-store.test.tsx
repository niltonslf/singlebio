import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
} from '@/__tests__/__helpers__'
import {authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils/user'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/firestore')
jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

describe('AuthStore', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  describe('computed', () => {
    it('should get user() be equals to userModel', () => {
      const userMock = makeUser()
      authStore.setUser(userMock)

      expect(authStore.userModel).toStrictEqual(userMock)
    })
  })

  describe('signInWithGoogle', () => {
    it('should call google signin and update user data', async () => {
      const firebaseUserMock = makeFbUser()
      const userMock = parseToUser(firebaseUserMock)

      jest
        .spyOn(firebaseAuth, 'signInWithPopup')
        .mockResolvedValue({user: firebaseUserMock} as any)

      jest.spyOn(authStore, 'authUser').mockResolvedValue(userMock)

      await expect(authStore.signInWithGoogle()).resolves.toBe(userMock)
    })

    it('should call google signin and throw an error', async () => {
      jest.spyOn(firebaseAuth, 'signInWithPopup').mockRejectedValue(undefined)

      await expect(authStore.signInWithGoogle()).rejects.toBe(
        'could not authenticate user',
      )
    })
  })

  describe('authUser', () => {
    it('should authenticate the user with an existent account', async () => {
      const [firebaseUser, userMock] = [makeFbUser(), makeUser()]

      // simulate an user already in the database
      const userRes = makeGetDocsResponse({data: userMock, exists: true})
      jest.spyOn(firestore, 'getDoc').mockResolvedValue(userRes)

      const resAuth = await authStore.authUser(firebaseUser)

      expect({...authStore.firebaseUser}).toEqual(firebaseUser)
      expect({...authStore.user}).toEqual(userMock)
      expect(resAuth).toEqual(userMock)
    })

    it('should authenticate the user creating a new account', async () => {
      const firebaseUser = makeFbUser()
      const userMock = parseToUser(firebaseUser)

      // simulate no user found
      const userRes = makeGetDocsResponse({exists: false})
      jest.spyOn(firestore, 'getDoc').mockResolvedValue(userRes)

      const resAuth = await authStore.authUser(firebaseUser)

      expect({...authStore.firebaseUser}).toEqual(firebaseUser)
      expect({...authStore.user}).toEqual(userMock)
      expect(resAuth).toEqual(userMock)
    })
  })

  // describe('updateUser', () => {
  //   it('Update user variable', () => {
  //     const user = makeUser()

  //     authStore.setUser(user)

  //     expect(authStore.user).toStrictEqual(user)
  //   })
  // })

  // describe('clearUser', () => {
  //   it('Clear users variables', () => {
  //     authStore.clearUser()

  //     expect(authStore.user).toBe(undefined)
  //     expect(authStore.firebaseUser).toBe(undefined)
  //   })
  // })

  // describe('deleteUser', () => {
  //   it('delete user successfully', async () => {
  //     authStore.userModel = makeUser()

  //     jest.spyOn(firebaseAuth, 'getAuth').mockReturnValue({
  //       currentUser: {} as firebaseAuth.User,
  //     } as firebaseAuth.Auth)

  //     jest.spyOn(authStore, 'clearUser')

  //     await authStore.deleteUser()

  //     expect(firebaseAuth.reauthenticateWithPopup).toHaveBeenCalledTimes(1)
  //     expect(firebaseAuth.deleteUser).toHaveBeenCalledTimes(1)
  //     expect(firestore.deleteDoc).toHaveBeenCalledTimes(1)
  //     expect(authStore.clearUser).toHaveBeenCalledTimes(1)
  //     expect(authStore.firebaseUser).toBe(undefined)
  //     expect(authStore.user).toBe(undefined)
  //   })
  // })
})

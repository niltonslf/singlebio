import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
  makeUserTheme,
} from '@/__tests__/__helpers__'
import {authStore} from '@/app/auth/context/auth-store'
import {ERROR_MESSAGES} from '@/constants/error-msgs'
import {Providers} from '@/domain/enums'
import {parseToUser} from '@/utils/user'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}))

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

      jest
        .spyOn(firebaseAuth, 'signInWithPopup')
        .mockResolvedValue({user: firebaseUserMock} as any)

      jest.spyOn(authStore, 'authUser').mockResolvedValue()

      await expect(authStore.signInWithGoogle()).resolves.toBeFalsy()
    })

    it('should call google signin and throw an error', async () => {
      jest.spyOn(firebaseAuth, 'signInWithPopup').mockRejectedValue(undefined)

      await expect(authStore.signInWithGoogle()).rejects.toBe(
        ERROR_MESSAGES['error-to-authenticate-user'],
      )
    })
  })

  describe('authUser', () => {
    it('should authenticate the user with an existent account', async () => {
      const [firebaseUser, userMock] = [makeFbUser(), makeUser()]

      // simulate an user already in the database
      const userRes = makeGetDocsResponse({data: userMock, exists: true})
      jest.spyOn(firestore, 'getDoc').mockResolvedValue(userRes)

      await authStore.authUser(firebaseUser)

      expect({...authStore.firebaseUser}).toEqual(firebaseUser)
      expect({...authStore.user}).toEqual(userMock)
    })

    it('should authenticate the user creating a new account', async () => {
      const firebaseUser = makeFbUser()
      const userMock = parseToUser(firebaseUser)

      // simulate no user found
      const userRes = makeGetDocsResponse({exists: false})
      jest
        .spyOn(firestore, 'getDoc')
        .mockImplementation(() => Promise.resolve(userRes))

      // simulate save user
      jest
        .spyOn(firestore, 'setDoc')
        .mockImplementation(() => Promise.resolve())

      // SUT
      await authStore.authUser(firebaseUser)

      expect({...authStore.firebaseUser}).toEqual(firebaseUser)
      expect({...authStore.user}).toEqual(userMock)
    })
  })

  describe('updateUser', () => {
    it('should throw an error if user does not exists', async () => {
      const userMock = makeUser()

      await expect(authStore.updateUser(userMock)).rejects.toBe(
        ERROR_MESSAGES['user-not-found'],
      )
    })

    it('should update user data in the store and in the database', async () => {
      const initialUserData = makeUser()
      // simulate an user already logged in
      authStore.setUser(initialUserData)

      jest.spyOn(firestore, 'updateDoc').mockResolvedValue()

      const userNewData = {theme: makeUserTheme()}

      // SUT
      const updateRes = await authStore.updateUser(userNewData)

      const mergedUserData = {...initialUserData, ...userNewData}

      expect(authStore.userModel).toEqual(mergedUserData)
      expect(updateRes).toEqual(mergedUserData)
    })
  })

  describe('setUser', () => {
    it('should replace user data', () => {
      const userMock = makeUser()

      authStore.setUser(userMock)

      expect(authStore.userModel).toEqual(userMock)
    })
  })

  describe('clearUser', () => {
    it('should clear userModel and firebaseUser properties', () => {
      authStore.clearUser()

      expect(authStore.user).toBe(undefined)
      expect(authStore.firebaseUser).toBe(undefined)
    })
  })

  describe('logout', () => {
    it('should call signOut method from firebase', async () => {
      await expect(authStore.logout()).resolves.toBeUndefined()
    })
  })

  describe('deleteUser', () => {
    it('should throw an error to delete user', async () => {
      // mock the getAuth method to don't return any user
      const authRes = {currentUser: null} as firebaseAuth.Auth
      jest.spyOn(firebaseAuth, 'getAuth').mockReturnValue(authRes)

      await expect(authStore.deleteUser()).rejects.toBe(
        ERROR_MESSAGES['user-not-found'],
      )
    })

    it('should delete user with google provider', async () => {
      const fbUserMock = makeFbUser({providerId: Providers.GOOGLE})
      const userMock = parseToUser(fbUserMock)

      // simulate an user logged in
      authStore.setUser(userMock)
      authStore.setFirebaseUser(fbUserMock)

      jest
        .spyOn(firebaseAuth, 'reauthenticateWithPopup')
        .mockResolvedValue({} as firebaseAuth.UserCredential)

      // simulate links in the profile
      const linksRes = makeGetDocsResponse({docs: [1, 2]})
      jest.spyOn(firestore, 'getDocs').mockResolvedValue(linksRes)
      jest.spyOn(firestore, 'doc').mockImplementation()
      jest.spyOn(firestore, 'deleteDoc').mockImplementation()

      jest.spyOn(firebaseAuth, 'deleteUser').mockResolvedValue()

      jest.spyOn(authStore, 'clearUser')

      await authStore.deleteUser()

      expect(firebaseAuth.reauthenticateWithPopup).toHaveBeenCalledTimes(1)
      expect(firestore.getDocs).toHaveBeenCalledTimes(1)
      expect(firestore.deleteDoc).toHaveBeenCalled()
      expect(firebaseAuth.deleteUser).toHaveBeenCalledTimes(1)
      expect(authStore.clearUser).toHaveBeenCalledTimes(1)
      expect(authStore.firebaseUser).toBe(undefined)
      expect(authStore.user).toBe(undefined)
    })

    // it('should delete user with github provider', async () => {
    //   const fbUserMock = makeFbUser()
    //   const userMock = parseToUser(fbUserMock)

    //   // simulate an user logged in
    //   authStore.userModel = userMock
    //   authStore.firebaseUser = fbUserMock

    //   // mock the getAuth method to return the fake logged in user
    //   const authRes = {
    //     currentUser: {
    //       ...fbUserMock,
    //       providerData: [{providerId: 'google.com'}],
    //     },
    //   } as firebaseAuth.Auth

    //   // SUT
    //   await authStore.deleteUser()
    // })
  })
})

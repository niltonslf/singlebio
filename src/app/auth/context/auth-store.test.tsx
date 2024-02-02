import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
  makeUserTheme,
} from '@/__tests__'
import {adminStore} from '@/app/admin/context/admin-store'
import {authStore} from '@/app/auth/context/auth-store'
import {APP_URL} from '@/config/envs'
import {ERROR_MESSAGES} from '@/constants/error-msgs'
import {AuthProviders} from '@/domain/enums'
import {auth} from '@/services/firebase'
import {parseToUser} from '@/utils'
import * as windowUtils from '@/utils/window'
import {faker} from '@faker-js/faker'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('@/utils/window', () => ({
  __esModule: true,
  ...jest.requireActual('@/utils/window'),
}))

describe('AuthStore', () => {
  beforeEach(() => {
    cleanup()
    authStore.clearUser()
  })

  describe('computed', () => {
    it('should get user() be equals to userModel', () => {
      const userMock = makeUser()
      adminStore.setUser(userMock)

      expect(adminStore.user).toStrictEqual(userMock)
    })
  })

  describe('signInWithGoogle', () => {
    it('should call google signin and update user data', async () => {
      const firebaseUserMock = makeFbUser()

      jest
        .spyOn(firebaseAuth, 'signInWithPopup')
        .mockResolvedValue({user: firebaseUserMock} as any)

      jest.spyOn(authStore, 'authOrCreateUser').mockResolvedValue()

      await expect(authStore.signInWithGoogle()).resolves.toBeUndefined()
    })

    it('should call google, signin and throw an error', async () => {
      jest.spyOn(firebaseAuth, 'signInWithPopup').mockRejectedValue({code: ''})

      await expect(authStore.signInWithGoogle()).rejects.toBe(
        ERROR_MESSAGES['error-to-authenticate-user'],
      )
    })

    it('should call google, signin and throw an custom error', async () => {
      jest
        .spyOn(firebaseAuth, 'signInWithPopup')
        .mockRejectedValue({code: 'auth/email-already-in-use'})

      await expect(authStore.signInWithGoogle()).rejects.toBe(
        ERROR_MESSAGES['auth/email-already-in-use'],
      )
    })
  })

  describe('signInWithEmailAndPassword', () => {
    it('should call firebase, signin and update user data', async () => {
      const firebaseUserMock = makeFbUser()
      const emailMock = firebaseUserMock.email as string
      const passwordMock = faker.internet.password({length: 8})

      jest
        .spyOn(firebaseAuth, 'signInWithEmailAndPassword')
        .mockResolvedValue({user: firebaseUserMock} as any)

      jest.spyOn(authStore, 'authOrCreateUser').mockResolvedValue()

      const signIn = authStore.signInWithEmailAndPassword(
        emailMock,
        passwordMock,
      )

      await expect(signIn).resolves.toBeUndefined()
      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        emailMock,
        passwordMock,
      )
    })
    it('should call firebase, signin and throw an error', async () => {
      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      jest.spyOn(firebaseAuth, 'signInWithPopup').mockRejectedValue({code: ''})

      const signIn = authStore.signInWithEmailAndPassword(
        emailMock,
        passwordMock,
      )

      await expect(signIn).rejects.toBe(
        ERROR_MESSAGES['error-to-authenticate-user'],
      )
    })

    it('should call firebase, signin and throw an custom error', async () => {
      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      jest
        .spyOn(firebaseAuth, 'signInWithEmailAndPassword')
        .mockRejectedValue({code: 'auth/email-already-in-use'})

      const signIn = authStore.signInWithEmailAndPassword(
        emailMock,
        passwordMock,
      )

      await expect(signIn).rejects.toBe(
        ERROR_MESSAGES['auth/email-already-in-use'],
      )
    })
  })

  describe('createWithEmailAndPassword', () => {
    it('should create an account using email and password', async () => {
      const firebaseUserMock = makeFbUser()
      const userMock = parseToUser(firebaseUserMock, makeUserTheme())
      const passwordMock = faker.internet.password({length: 8})
      const displayNameMock = faker.internet.userName()

      jest
        .spyOn(firebaseAuth, 'createUserWithEmailAndPassword')
        .mockResolvedValue({
          user: firebaseUserMock,
          operationType: 'signIn',
          providerId: 'some-id',
        })
      jest.spyOn(firebaseAuth, 'updateProfile').mockResolvedValue()
      jest.spyOn(firebaseAuth, 'sendEmailVerification').mockResolvedValue()
      jest.spyOn(authStore, 'authOrCreateUser').mockResolvedValue()
      jest.spyOn(authStore, 'logout')

      // SUT
      await authStore.createWithEmailAndPassword({
        email: userMock.email,
        password: passwordMock,
        displayName: displayNameMock,
      })

      expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        userMock.email,
        passwordMock,
      )
      expect(firebaseAuth.updateProfile).toHaveBeenCalledWith(
        firebaseUserMock,
        {displayName: displayNameMock},
      )
      expect(firebaseAuth.sendEmailVerification).toHaveBeenCalledWith(
        firebaseUserMock,
        {url: `${APP_URL}/auth`},
      )
      expect(authStore.logout).toHaveBeenCalled()
    })

    it('should return an error to create an account', async () => {
      const firebaseUserMock = makeFbUser()
      const userMock = parseToUser(firebaseUserMock, makeUserTheme())
      const passwordMock = faker.internet.password({length: 8})
      const displayNameMock = faker.internet.userName()

      jest
        .spyOn(firebaseAuth, 'createUserWithEmailAndPassword')
        .mockRejectedValue('error')

      // SUT
      const sut = authStore.createWithEmailAndPassword({
        email: userMock.email,
        password: passwordMock,
        displayName: displayNameMock,
      })

      expect(sut).rejects.toBe(ERROR_MESSAGES['error-to-create-account'])
    })

    it('should return a custom error to create an account', async () => {
      const firebaseUserMock = makeFbUser()
      const userMock = parseToUser(firebaseUserMock, makeUserTheme())
      const passwordMock = faker.internet.password({length: 8})
      const displayNameMock = faker.internet.userName()

      jest
        .spyOn(firebaseAuth, 'createUserWithEmailAndPassword')
        .mockRejectedValue({code: 'auth/email-already-in-use'})

      // SUT
      const sut = authStore.createWithEmailAndPassword({
        email: userMock.email,
        password: passwordMock,
        displayName: displayNameMock,
      })

      expect(sut).rejects.toBe(ERROR_MESSAGES['auth/email-already-in-use'])
    })
  })

  describe('signInWithGithub', () => {
    it('should call github, signin and update user data', async () => {
      const firebaseUserMock = makeFbUser()

      jest
        .spyOn(firebaseAuth, 'signInWithPopup')
        .mockResolvedValue({user: firebaseUserMock} as any)

      jest.spyOn(authStore, 'authOrCreateUser').mockResolvedValue()

      await expect(authStore.signInWithGithub()).resolves.toBeUndefined()
    })
    it('should call github, signin and throw an error', async () => {
      jest.spyOn(firebaseAuth, 'signInWithPopup').mockRejectedValue({code: ''})

      await expect(authStore.signInWithGithub()).rejects.toBe(
        ERROR_MESSAGES['error-to-authenticate-user'],
      )
    })

    it('should call github, signin and throw an custom error', async () => {
      jest
        .spyOn(firebaseAuth, 'signInWithPopup')
        .mockRejectedValue({code: 'auth/email-already-in-use'})

      await expect(authStore.signInWithGithub()).rejects.toBe(
        ERROR_MESSAGES['auth/email-already-in-use'],
      )
    })
  })

  describe('authOrCreateUser', () => {
    it('should authenticate the user with an existent account', async () => {
      const [firebaseUser, userMock] = [makeFbUser(), makeUser()]

      // simulate an user already in the database
      const userRes = makeGetDocsResponse({data: userMock, exists: true})
      jest.spyOn(firestore, 'getDoc').mockResolvedValue(userRes)

      await authStore.authOrCreateUser(firebaseUser)

      expect({...authStore.firebaseUser}).toEqual(firebaseUser)
      expect({...adminStore.user}).toEqual(userMock)
    })

    it('should authenticate the user creating a new account', async () => {
      const firebaseUser = makeFbUser()
      const userMock = parseToUser(firebaseUser, makeUserTheme())

      // simulate no user found
      const userRes = makeGetDocsResponse({exists: false})
      jest
        .spyOn(firestore, 'getDoc')
        .mockImplementation(() => Promise.resolve(userRes))

      // simulate save user
      jest
        .spyOn(authStore, 'persistUser')
        .mockImplementation(() => Promise.resolve(userMock))

      // SUT
      await authStore.authOrCreateUser(firebaseUser)

      expect({...authStore.firebaseUser}).toEqual(firebaseUser)
      expect({...adminStore.user}).toEqual(userMock)
    })
  })

  describe('clearUser', () => {
    it('should clear userModel and firebaseUser properties', () => {
      authStore.clearUser()

      expect(adminStore.user).toBe(undefined)
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
      const fbUserMock = makeFbUser({providerId: AuthProviders.GOOGLE})
      const userMock = parseToUser(fbUserMock, makeUserTheme())

      // simulate an user logged in
      adminStore.setUser(userMock)
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

      // SUT
      await authStore.deleteUser()

      expect(firebaseAuth.reauthenticateWithPopup).toHaveBeenCalledTimes(1)
      expect(firestore.deleteDoc).toHaveBeenCalled()
      expect(firebaseAuth.deleteUser).toHaveBeenCalledTimes(1)
      expect(authStore.clearUser).toHaveBeenCalledTimes(1)
      expect(authStore.firebaseUser).toBe(undefined)
      expect(adminStore.user).toBe(undefined)
    })

    it('should delete user with github provider', async () => {
      const fbUserMock = makeFbUser({providerId: AuthProviders.GITHUB})
      const userMock = parseToUser(fbUserMock, makeUserTheme())

      // simulate an user logged in
      adminStore.setUser(userMock)
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

      // SUT
      await authStore.deleteUser()

      expect(firebaseAuth.reauthenticateWithPopup).toHaveBeenCalledTimes(1)
      expect(firestore.deleteDoc).toHaveBeenCalled()
      expect(firebaseAuth.deleteUser).toHaveBeenCalledTimes(1)
      expect(authStore.clearUser).toHaveBeenCalledTimes(1)
      expect(authStore.firebaseUser).toBe(undefined)
      expect(adminStore.user).toBe(undefined)
    })

    it('should delete user with password provider', async () => {
      const fbUserMock = makeFbUser({providerId: AuthProviders.PASSWORD})
      const userMock = parseToUser(fbUserMock, makeUserTheme())

      // simulate an user logged in
      adminStore.setUser(userMock)
      authStore.setFirebaseUser(fbUserMock)

      jest
        .spyOn(windowUtils, 'createPopup')
        .mockImplementation(() => Promise.resolve())

      // simulate links in the profile
      const linksRes = makeGetDocsResponse({docs: [1, 2]})
      jest.spyOn(firestore, 'getDocs').mockResolvedValue(linksRes)
      jest.spyOn(firestore, 'doc').mockImplementation()
      jest.spyOn(firestore, 'deleteDoc').mockImplementation()

      jest.spyOn(firebaseAuth, 'deleteUser').mockResolvedValue()

      jest.spyOn(authStore, 'clearUser')

      // SUT
      await authStore.deleteUser()

      expect(windowUtils.createPopup).toHaveBeenCalledTimes(1)
      expect(firestore.deleteDoc).toHaveBeenCalled()
      expect(firebaseAuth.deleteUser).toHaveBeenCalledTimes(1)
      expect(authStore.clearUser).toHaveBeenCalledTimes(1)
      expect(authStore.firebaseUser).toBe(undefined)
      expect(adminStore.user).toBe(undefined)
    })
  })

  describe('resetPassword', () => {
    it('should send password reset email', async () => {
      const emailMock = faker.internet.email()
      const continueUrl = `${APP_URL}/auth`

      jest.spyOn(firebaseAuth, 'sendPasswordResetEmail').mockResolvedValue()

      // SUT
      await authStore.resetPassword(emailMock)

      expect(firebaseAuth.sendPasswordResetEmail).toHaveBeenCalledWith(
        auth,
        emailMock,
        {url: continueUrl},
      )
    })
  })

  describe('reauthenticateWithEmailAndPassword', () => {
    it('should return error if firebaseUser does not exists', async () => {
      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      // SUT
      const sut = authStore.reauthenticateWithEmailAndPassword(
        emailMock,
        passwordMock,
        null,
      )

      expect(sut).rejects.toBe(ERROR_MESSAGES['user-not-found'])
    })

    it('should reauthenticate user', async () => {
      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})
      const authResponseDummy = {
        user: makeFbUser(),
        operationType: 'signIn',
        providerId: 'some-id',
      } as firebaseAuth.UserCredential

      jest
        .spyOn(firebaseAuth.EmailAuthProvider, 'credential')
        .mockImplementation()
      jest
        .spyOn(firebaseAuth, 'reauthenticateWithCredential')
        .mockResolvedValue(authResponseDummy)

      // SUT
      const sut = authStore.reauthenticateWithEmailAndPassword(
        emailMock,
        passwordMock,
        makeFbUser(),
      )

      expect(sut).resolves.toBe(undefined)
    })

    it('should return an error to reauthenticate user', async () => {
      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      jest
        .spyOn(firebaseAuth.EmailAuthProvider, 'credential')
        .mockImplementation()
      jest
        .spyOn(firebaseAuth, 'reauthenticateWithCredential')
        .mockRejectedValue('')

      // SUT
      const sut = authStore.reauthenticateWithEmailAndPassword(
        emailMock,
        passwordMock,
        makeFbUser(),
      )

      expect(sut).rejects.toBe(ERROR_MESSAGES['error-to-authenticate-user'])
    })

    it('should return a custom error to reauthenticate user', async () => {
      const emailMock = faker.internet.email()
      const passwordMock = faker.internet.password({length: 8})

      jest
        .spyOn(firebaseAuth.EmailAuthProvider, 'credential')
        .mockImplementation()
      jest
        .spyOn(firebaseAuth, 'reauthenticateWithCredential')
        .mockRejectedValue({code: 'auth/invalid-login-credentials'})

      // SUT
      const sut = authStore.reauthenticateWithEmailAndPassword(
        emailMock,
        passwordMock,
        makeFbUser(),
      )

      expect(sut).rejects.toBe(ERROR_MESSAGES['auth/invalid-login-credentials'])
    })
  })
})

import * as firestore from 'firebase/firestore'

import {makeUser, makeUserTheme} from '@/__tests__'
import {adminStore} from '@/app/admin/context/admin-store'
import {ERROR_MESSAGES} from '@/constants/error-msgs'
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

describe('AdminStore', () => {
  beforeEach(() => {
    cleanup()
    adminStore.reset()
  })

  describe('updateUser', () => {
    it('should throw an error if user does not exists', async () => {
      const userMock = makeUser()

      await expect(adminStore.updateUser(userMock)).rejects.toBe(
        ERROR_MESSAGES['user-not-found'],
      )
    })

    it('should update user data in the store and in the database', async () => {
      const initialUserData = makeUser()
      // simulate an user already logged in
      adminStore.setUser(initialUserData)

      jest.spyOn(firestore, 'updateDoc').mockResolvedValue()

      const userNewData = {theme: makeUserTheme()}

      // SUT
      const updateRes = await adminStore.updateUser(userNewData)

      const mergedUserData = {...initialUserData, ...userNewData}

      expect(adminStore.user).toEqual(mergedUserData)
      expect(updateRes).toEqual(mergedUserData)
    })
  })

  describe('setUser', () => {
    it('should replace user data', () => {
      const userMock = makeUser()

      adminStore.setUser(userMock)

      expect(adminStore.user).toEqual(userMock)
    })
  })
})

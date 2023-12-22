import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {fail, makeFbUser, makeGetDocsResponse, setup} from '@/__tests__/utils'
import AppearancePage from '@/app/admin/appearance/page'
import {Layout} from '@/app/admin/components'
import {parseToUser} from '@/utils'
import {faker} from '@faker-js/faker'

import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  onSnapshot: jest.fn(() => jest.fn()),
}))

const handlePageAuthentication = (
  fbUserMock: firebaseAuth.User | undefined,
  username: string = faker.internet.userName(),
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

jest.mock('@/app/admin/context/smartphone-context', () => {
  return {
    ...jest.requireActual('@/app/admin/context/smartphone-context'),
    useSmartphone: () => {
      return {
        iframeRef: {current: null},
        reloadSmartphoneList: jest.fn(),
        updateSmartphoneSrc: jest.fn(),
      }
    },
  }
})

describe('Appearance Page', () => {
  describe('smartphone', () => {
    it('should update smartphone source', () => {
      handlePageAuthentication(makeFbUser())

      setup(
        <Layout>
          <AppearancePage />
        </Layout>,
      )

      const smartphone = document.querySelector('iframe')

      if (!smartphone) return fail()

      expect(smartphone.src).toBe('http://localhost/demo')
    })
  })
})

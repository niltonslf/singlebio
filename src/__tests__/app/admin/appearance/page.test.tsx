import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {fail, makeFbUser, makeGetDocsResponse, setup} from '@/__tests__/utils'
import {appearanceStore} from '@/app/admin/appearance/context'
import AppearancePage from '@/app/admin/appearance/page'
import {Layout} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils'
import {faker} from '@faker-js/faker'
import '@testing-library/jest-dom'
import {screen} from '@testing-library/react'

import {makeImageFile} from './components/customize-wallpaper/index.test'

jest.mock('@/app/admin/appearance/hooks/use-background-upload', () => ({
  useBackgroundUpload: () => {
    return {upload: () => 'path-to-file'}
  },
}))
jest.mock('@/app/admin/appearance/hooks/use-image-compressor', () => ({
  useImageCompressor: () => {
    return {compress: () => null}
  },
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

const makeSUT = () => {
  handlePageAuthentication(makeFbUser())

  return setup(
    <Layout>
      <AppearancePage />
    </Layout>,
  )
}

describe('Appearance Page', () => {
  describe('Customization section', () => {
    it('should save theme', async () => {
      appearanceStore.setBackgroundColor('#000')
      appearanceStore.setBackgroundFile(makeImageFile())
      appearanceStore.setBackgroundImage('some-url')
      appearanceStore.setButtonBackground('#000')
      appearanceStore.setButtonTextColor('#000')
      appearanceStore.setUsernameColor('#000')

      jest.spyOn(authStore, 'updateUser')
      jest.spyOn(appearanceStore, 'setBackgroundFile')

      const {user} = makeSUT()

      const buttons = screen.getAllByRole('button')
      const submitButton = buttons[0]

      await user.click(submitButton)

      expect(appearanceStore.setBackgroundFile).toHaveBeenCalledTimes(1)
      expect(appearanceStore.setBackgroundFile).toHaveBeenCalledWith(undefined)

      expect(authStore.updateUser).toHaveBeenCalledTimes(1)
      expect(authStore.updateUser).toHaveBeenCalledWith({
        theme: appearanceStore.theme,
      })
    })

    it.todo('should reset theme')
  })

  describe('smartphone', () => {
    it('should update smartphone source', () => {
      makeSUT()

      const smartphone = document.querySelector('iframe')

      if (!smartphone) return fail()

      expect(smartphone.src).toBe('http://localhost/demo')
    })
  })
})

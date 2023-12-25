import * as firebaseAuth from 'firebase/auth'
import * as firestore from 'firebase/firestore'

import {
  makeFbUser,
  makeGetDocsResponse,
  makeUser,
  makeUserTheme,
  setup,
} from '@/__tests__/utils'
import {appearanceStore} from '@/app/admin/appearance/context'
import AppearancePage from '@/app/admin/appearance/page'
import AdminLayout from '@/app/admin/layout'
import {authStore} from '@/app/auth/context/auth-store'
import {parseToUser} from '@/utils'
import {faker} from '@faker-js/faker'
import '@testing-library/jest-dom'
import {act, cleanup, screen, waitFor} from '@testing-library/react'

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

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
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

const makeSUT = () => {
  handlePageAuthentication(makeFbUser())

  return setup(
    <AdminLayout>
      <AppearancePage />
    </AdminLayout>,
  )
}

const setCustomTheme = () => {
  appearanceStore.setBackgroundColor('#0F2')
  appearanceStore.setBackgroundFile(makeImageFile())
  appearanceStore.setBackgroundImage('some-url')
  appearanceStore.setButtonBackground('#0F2')
  appearanceStore.setButtonTextColor('#0F2')
  appearanceStore.setUsernameColor('#0F2')
}

describe('Appearance Page', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Customization section', () => {
    it('should save theme', async () => {
      setCustomTheme()

      jest.spyOn(authStore, 'updateUser')
      jest.spyOn(appearanceStore, 'setBackgroundFile')
      jest.spyOn(firestore, 'updateDoc').mockImplementation()

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

      const successMsg = screen.getByText(
        'Theme published with success! You can check on your profile link.',
      )

      expect(successMsg).toBeInTheDocument()

      await act(async () => {
        await new Promise(r => setTimeout(r, 6000))
      })

      const successMsgAfter = screen.queryByText(
        'Theme published with success! You can check on your profile link.',
      )
      expect(successMsgAfter).not.toBeInTheDocument()
    }, 8000)

    it('should reset theme', async () => {
      setCustomTheme()

      const {user} = makeSUT()

      const buttons = screen.getAllByRole('button')
      const resetButton = buttons[1]

      await user.click(resetButton)

      expect(appearanceStore.theme).toStrictEqual({
        backgroundImage: '',
        backgroundColor: '',
        buttonBackground: '#FFF',
        buttonTextColor: '#000',
        usernameColor: '#000',
      })
      expect(appearanceStore.aux.backgroundFile).toBe(undefined)
    })

    it('should update appearanceStore when user theme updates', async () => {
      jest.spyOn(appearanceStore, 'setTheme')

      const user = makeUser()
      const theme = makeUserTheme()

      makeSUT()

      await act(() => authStore.setUser({...user, theme}))

      await waitFor(() => {
        expect(appearanceStore.setTheme).toHaveBeenCalledTimes(1)
        expect(appearanceStore.setTheme).toHaveBeenCalledWith(theme)
      })
    })
  })
})

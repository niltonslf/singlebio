import * as firestore from 'firebase/firestore'

import {
  handlePageAuthentication,
  makeFbUser,
  makeUser,
  makeUserTheme,
  setup,
} from '@/__tests__/__helpers__'
import {appearanceStore} from '@/app/admin/appearance/context'
import AppearancePage from '@/app/admin/appearance/page'
import AdminLayoutWrapper from '@/app/admin/layout'
import {authStore} from '@/app/auth/context/auth-store'
import {act, cleanup, screen, waitFor} from '@testing-library/react'

import {makeImageFile} from './components/customize-wallpaper/index.test'

jest.mock('@/app/admin/hooks/use-image-uploader', () => ({
  useImageUploader: () => {
    return {
      upload: () => 'path-to-file',
      returnImageThumbnail: () => 'image-path',
    }
  },
}))
jest.mock('@/app/admin/hooks/use-image-compressor', () => ({
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

const makeSUT = () => {
  handlePageAuthentication(makeFbUser())

  return setup(
    <AdminLayoutWrapper>
      <AppearancePage />
    </AdminLayoutWrapper>,
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

  it('should save theme', async () => {
    setCustomTheme()

    jest.spyOn(authStore, 'updateUser')
    jest.spyOn(appearanceStore, 'setBackgroundFile')
    jest.spyOn(firestore, 'updateDoc').mockImplementation()

    const {user} = await waitFor(() => makeSUT())

    const submitButton = screen.getByRole('button', {name: /save/i})

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
  })

  it('should reset theme', async () => {
    setCustomTheme()

    const {user} = await waitFor(() => makeSUT())

    const resetBtn = screen.getByText(/reset/i)

    await user.click(resetBtn)

    expect(appearanceStore.theme).toStrictEqual({
      backgroundImage: '',
      backgroundColor: '',
      buttonBackground: '#FFF',
      buttonTextColor: '#000',
      buttonStyle: 'default',
      socialDefaultColor: false,
      socialIconColor: '#000',
      usernameColor: '#000',
    })
    expect(appearanceStore.aux.backgroundFile).toBe(undefined)
  })

  it('should update appearanceStore when user theme updates', async () => {
    jest.spyOn(appearanceStore, 'setTheme')

    const user = makeUser()
    const theme = makeUserTheme()

    await waitFor(() => makeSUT())

    await act(() => {
      adminStore.setUser({...user, theme})
    })

    await waitFor(() => {
      expect(appearanceStore.setTheme).toHaveBeenCalledTimes(1)
      expect(appearanceStore.setTheme).toHaveBeenCalledWith(theme)
    })
  })
})

import {b64toBlob, fail, setup} from '@/__tests__/utils'
import {CustomizeWallpaper} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import '@testing-library/jest-dom'
import {screen} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  setDoc: jest.fn(),
  doc: jest.fn(),
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

const makeSUT = () => {
  return setup(<CustomizeWallpaper />)
}

describe('Customize wallpaper', () => {
  it('should select wallpaper', async () => {
    const url = 'some-url'
    global.URL.createObjectURL = jest.fn(() => url)

    const blob = b64toBlob(
      'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAALElEQVR4nGJZFhDCgAQ2MdUhc5kY8AKaSjM+lNqHzE/fcY9udhOQBgQAAP//FgsGSDtiJfMAAAAASUVORK5CYII=',
      'image/jpeg',
    )
    const file = new File([blob], 'image', {type: 'image/jpeg'})

    const {user} = makeSUT()

    const fileInput = screen.getByTestId('wallpaper-file')
    const thumbnail = document.querySelector('label[for=wallpaper-file] img')

    if (!fileInput) return fail()

    await user.upload(fileInput, file)

    // check if it's displaying the thumbnail
    expect(thumbnail).toHaveAttribute('src', url)

    // check if it has updated the store
    expect(appearanceStore.theme.backgroundImage).toBe(url)
    expect(appearanceStore.aux.backgroundFile).toBe(file)
  })

  it.todo('should remove selected wallpaper')

  it.todo('should select background color')
})

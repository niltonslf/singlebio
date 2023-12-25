import {b64toBlob, fail, setup} from '@/__tests__/utils'
import {CustomizeWallpaper} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import {cleanup, screen, waitFor} from '@testing-library/react'

export const makeImageFile = () => {
  const blob = b64toBlob(
    'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAALElEQVR4nGJZFhDCgAQ2MdUhc5kY8AKaSjM+lNqHzE/fcY9udhOQBgQAAP//FgsGSDtiJfMAAAAASUVORK5CYII=',
    'image/jpeg',
  )
  return new File([blob], 'image', {type: 'image/jpeg'})
}

const makeSUT = () => {
  return setup(<CustomizeWallpaper />)
}

describe('Customize wallpaper', () => {
  afterEach(() => {
    cleanup()
  })

  it('should select wallpaper', async () => {
    const url = 'some-url'
    global.URL.createObjectURL = jest.fn(() => url)

    const file = makeImageFile()

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

  it('should remove selected wallpaper', async () => {
    const url = 'some-url'
    global.URL.createObjectURL = jest.fn(() => url)

    const file = makeImageFile()

    const {user} = makeSUT()

    const fileInput = screen.getByTestId('wallpaper-file')
    const imageArea = document.querySelector('label[for=wallpaper-file]')
    const deleteButton = imageArea?.querySelector('div > span')

    if (!imageArea || !deleteButton) return fail()

    await user.upload(fileInput, file)

    expect(appearanceStore.theme.backgroundImage).toBe(url)
    expect(appearanceStore.aux.backgroundFile).toBe(file)

    await user.hover(imageArea)
    await user.click(deleteButton)

    expect(appearanceStore.theme.backgroundImage).toBe('')
    expect(appearanceStore.aux.backgroundFile).toBe(undefined)
  })

  it('should select background color', async () => {
    const {user} = makeSUT()

    const colorPicker = document.querySelector('div[aria-label=Color]')

    if (!colorPicker) return fail()

    await user.pointer({
      target: colorPicker,
      coords: {clientX: 100, clientY: 50},
      keys: '[MouseLeft]',
    })

    await waitFor(() => {
      expect(appearanceStore.theme.backgroundColor).not.toBe('')
    })
  })
})

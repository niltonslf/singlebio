import {fail, setup} from '@/__tests__'
import {CustomizeWallpaper} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = () => {
  return setup(<CustomizeWallpaper />)
}

describe('Customize wallpaper', () => {
  afterEach(() => {
    cleanup()
  })

  it('should select background color', async () => {
    const {user} = makeSUT()

    const colorPickerBox = screen.getByTestId('color-picker')
    const colorPickerBtn = colorPickerBox.querySelector('div > div')

    if (!colorPickerBtn) return fail()

    await user.click(colorPickerBtn)

    const colorPickerPicker = colorPickerBox.querySelector(
      'div[aria-label=Color]',
    )

    if (!colorPickerPicker) return fail()

    expect(colorPickerPicker).toBeInTheDocument()

    await user.pointer({
      target: colorPickerPicker,
      coords: {clientX: 100, clientY: 50},
      keys: '[MouseLeft]',
    })

    await waitFor(() => {
      expect(appearanceStore.theme.backgroundColor).not.toBe('')
    })
  })
})

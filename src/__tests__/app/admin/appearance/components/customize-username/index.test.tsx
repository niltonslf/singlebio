import {fail, setup} from '@/__tests__/__helpers__'
import {CustomizeUsername} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = () => {
  return setup(<CustomizeUsername />)
}

describe('Customize username', () => {
  afterEach(() => {
    cleanup()
  })

  it('should select username color', async () => {
    jest.spyOn(appearanceStore, 'setUsernameColor')

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
      expect(appearanceStore.theme.usernameColor).not.toBe('#000')
      expect(appearanceStore.setUsernameColor).toHaveBeenCalledTimes(1)
    })
  })
})

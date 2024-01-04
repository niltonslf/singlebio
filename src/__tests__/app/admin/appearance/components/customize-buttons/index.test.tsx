import {fail, setup} from '@/__tests__/__helpers__'
import {CustomizeButtons} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = () => {
  return setup(<CustomizeButtons />)
}

describe('Customize buttons', () => {
  beforeEach(() => {
    cleanup()
    appearanceStore.reset()
  })

  it('should select button background', async () => {
    jest.spyOn(appearanceStore, 'setButtonBackground')

    const {user} = makeSUT()

    const colorPickerBox = screen.getAllByTestId('color-picker')[0]
    const colorPickerBtn = colorPickerBox.querySelector('div > div')

    if (!colorPickerBtn) return fail()

    await user.click(colorPickerBtn)

    const colorPickerPicker = colorPickerBox.querySelector(
      'div[aria-label=Color]',
    )

    if (!colorPickerPicker) return fail()

    expect(colorPickerPicker).toBeInTheDocument()

    await user.pointer({
      keys: '[MouseLeft]',
      target: colorPickerPicker,
      coords: {clientX: 50, clientY: 50},
    })

    await new Promise(resolve => setTimeout(resolve, 600))

    await waitFor(() => {
      expect(appearanceStore.theme.buttonBackground).not.toBe('#FFF')
      expect(appearanceStore.setButtonBackground).toHaveBeenCalledTimes(1)
    })
  })

  it('should select button color', async () => {
    jest.spyOn(appearanceStore, 'setButtonTextColor')

    const {user} = makeSUT()
    const colorPickerBox = screen.getAllByTestId('color-picker')[1]
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
      expect(appearanceStore.theme.buttonTextColor).not.toBe('#000')
      expect(appearanceStore.setButtonTextColor).toHaveBeenCalledTimes(1)
    })
  })
})

import {fail, setup} from '@/__tests__/utils'
import {CustomizeButtons} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import '@testing-library/jest-dom'
import {cleanup, waitFor} from '@testing-library/react'

const makeSUT = () => {
  return setup(<CustomizeButtons />)
}

describe('Customize buttons', () => {
  afterEach(() => {
    cleanup()
  })

  it('should select button background', async () => {
    jest.spyOn(appearanceStore, 'setButtonBackground')

    const {user} = makeSUT()

    const colorPicker = document.querySelectorAll('div[aria-label=Color]')

    if (!colorPicker) return fail()

    await user.pointer({
      target: colorPicker[0],
      coords: {clientX: 100, clientY: 50},
      keys: '[MouseLeft]',
    })

    await waitFor(() => {
      expect(appearanceStore.theme.buttonBackground).not.toBe('')
      expect(appearanceStore.setButtonBackground).toHaveBeenCalledTimes(1)
    })
  })

  it('should select button color', async () => {
    jest.spyOn(appearanceStore, 'setButtonTextColor')

    const {user} = makeSUT()

    const colorPicker = document.querySelectorAll('div[aria-label=Color]')

    if (!colorPicker) return fail()

    await user.pointer({
      target: colorPicker[1],
      coords: {clientX: 100, clientY: 50},
      keys: '[MouseLeft]',
    })

    await waitFor(() => {
      expect(appearanceStore.theme.buttonTextColor).not.toBe('')
      expect(appearanceStore.setButtonTextColor).toHaveBeenCalledTimes(1)
    })
  })
})

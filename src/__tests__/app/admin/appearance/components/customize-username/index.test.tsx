import {fail, setup} from '@/__tests__/utils'
import {CustomizeUsername} from '@/app/admin/appearance/components'
import {appearanceStore} from '@/app/admin/appearance/context'
import '@testing-library/jest-dom'
import {cleanup, waitFor} from '@testing-library/react'

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

    const colorPicker = document.querySelector('div[aria-label=Color]')

    if (!colorPicker) return fail()

    await user.pointer({
      target: colorPicker,
      coords: {clientX: 100, clientY: 50},
      keys: '[MouseLeft]',
    })

    await waitFor(() => {
      expect(appearanceStore.theme.usernameColor).not.toBe('')
      expect(appearanceStore.setUsernameColor).toHaveBeenCalledTimes(1)
    })
  })
})

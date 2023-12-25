import {setup} from '@/__tests__/__helpers__'
import {Modal} from '@/app/components'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = ({onSave = () => Promise.resolve(), initialOpen = false}) => {
  return setup(<Modal onSave={onSave} initialOpen={initialOpen} />)
}

const onSaveMock = jest.fn()

describe('Modal Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should display modal empty', async () => {
    makeSUT({onSave: onSaveMock, initialOpen: true})

    await waitFor(() => {
      const modal = document.querySelector('#headlessui-portal-root')
      const usernameInput = screen.getByRole('textbox')
      const saveButton = screen.getByRole('button')

      expect(modal).toBeVisible()
      expect(usernameInput).toHaveValue('')
      expect(saveButton).toBeDisabled()
    })
  })

  it.todo('should init modal open')

  it.todo('should disable save button when username exists')

  it.todo('should call onSave method')

  it.todo('should prevent close modal by clicking outside')
})

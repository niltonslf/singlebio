import * as firestore from 'firebase/firestore'

import {
  TransitionRoot,
  createReturnChildren,
  fail,
  makeGetDocsResponse,
  makeUser,
  setup,
} from '@/__tests__/__helpers__'
import {Modal} from '@/app/components'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('@headlessui/react', () => {
  return {
    ...jest.requireActual('@headlessui/react'),
    Dialog: Object.assign(createReturnChildren(), {
      Title: createReturnChildren(),
      Panel: createReturnChildren(),
    }),
    Transition: Object.assign(TransitionRoot, {
      Child: createReturnChildren(),
      Root: TransitionRoot,
    }),
  }
})

jest.mock('firebase/firestore')

const onSaveMock = jest.fn(() => Promise.resolve())

const makeSUT = ({onSave = onSaveMock, initialOpen = true} = {}) => {
  return setup(<Modal onSave={onSave} initialOpen={initialOpen} />)
}

const getModalElements = () => {
  const modal = document.querySelector('body > div > div > div')
  const usernameInput = screen.getByRole('textbox')
  const saveButton = screen.getByRole('button')

  return {
    modal,
    usernameInput,
    saveButton,
  }
}

describe('Modal Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should display modal empty', async () => {
    makeSUT()

    await waitFor(() => {
      const {modal, saveButton, usernameInput} = getModalElements()

      expect(modal).toBeVisible()
      expect(usernameInput).toHaveValue('')
      expect(saveButton).toBeDisabled()
    })
  })

  it('should disable save button and show error when username exists', async () => {
    const userMock = makeUser()

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValue(makeGetDocsResponse({data: [userMock]}))

    const {user} = makeSUT()

    await waitFor(async () => {
      if (!userMock?.username) return fail()

      const {saveButton, usernameInput} = getModalElements()

      await user.type(usernameInput, userMock?.username)

      const errorMsg = screen.getByText(/username already taken./i)

      expect(usernameInput).toHaveValue(userMock.username)
      expect(errorMsg).toBeVisible()
      expect(saveButton).toBeDisabled()
    })
  })

  it('should call onSave method', async () => {
    const userMock = makeUser()
    if (!userMock?.username) return fail()

    jest.spyOn(firestore, 'getDocs').mockResolvedValue(makeGetDocsResponse({}))

    const {user} = makeSUT()
    const {modal, saveButton, usernameInput} = getModalElements()

    await user.type(usernameInput, userMock.username)

    expect(usernameInput).toHaveValue(userMock.username)
    expect(saveButton).toBeEnabled()

    await user.click(saveButton)

    expect(onSaveMock).toHaveBeenCalledTimes(1)
    expect(modal).not.toBeVisible()
  })

  it.todo('should prevent close modal by clicking outside')
})

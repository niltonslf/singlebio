import * as firestore from 'firebase/firestore'

import {
  fail,
  makeGetDocsResponse,
  makeUser,
  setup,
} from '@/__tests__/__helpers__'
import {SetUsernameModal} from '@/app/components'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('firebase/firestore')
jest.mock('@react-input/mask')

const onSaveMock = jest.fn(() => Promise.resolve())

const makeSUT = ({onSave = onSaveMock, initialOpen = true} = {}) => {
  return setup(<SetUsernameModal onSave={onSave} initialOpen={initialOpen} />)
}

const getModalElements = () => {
  const modal = document.querySelector('body dialog')
  const usernameInput = document.querySelector('input')
  const saveButton = screen.getByTestId('modal-submit-button')

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
    await waitFor(() => makeSUT())

    const {modal, saveButton, usernameInput} = getModalElements()

    expect(modal?.classList.contains('modal-open')).toBe(true)
    expect(usernameInput).toHaveValue('')
    expect(saveButton).toBeDisabled()
  })

  it('should disable save button and show error when username exists', async () => {
    const username = 'some_username-11'
    const userMock = makeUser(
      undefined,
      undefined,
      undefined,
      undefined,
      username,
    )

    jest
      .spyOn(firestore, 'getDocs')
      .mockResolvedValue(makeGetDocsResponse({data: [userMock]}))

    const {user} = makeSUT()

    if (!userMock?.username) return fail()

    const {saveButton, usernameInput} = getModalElements()

    if (!usernameInput) return fail()

    await user.type(usernameInput, userMock?.username)

    const errorMsg = screen.getByText(/username already taken/i)

    expect(usernameInput).toHaveValue(userMock.username)
    expect(errorMsg).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
  })

  it('should call onSave method', async () => {
    const username = 'some_username-11'
    const userMock = makeUser(
      undefined,
      undefined,
      undefined,
      undefined,
      username,
    )

    if (!userMock?.username) return fail()

    // simulate username available
    jest.spyOn(firestore, 'getDocs').mockResolvedValue(makeGetDocsResponse({}))

    const {user} = makeSUT()
    const {saveButton, usernameInput, modal} = getModalElements()

    if (!usernameInput) return fail()

    await user.type(usernameInput, userMock.username.toLowerCase())

    expect(usernameInput).toHaveValue(userMock.username)
    expect(saveButton).toBeEnabled()

    await user.click(saveButton)

    expect(onSaveMock).toHaveBeenCalledTimes(1)
    expect(modal?.classList.contains('modal-open')).toBe(false)
  })
})

import {setup} from '@/__tests__/utils'
import {AddLinkForm} from '@/app/admin/components'
import {faker} from '@faker-js/faker'
import {screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'

const onAddLinkMock = jest.fn((data: any) => {
  return Promise.resolve(data)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Add Link Form Component', () => {
  it('render form with all fields', async () => {
    await waitFor(() => setup(<AddLinkForm saveLink={onAddLinkMock} />))

    const inputUrl = screen.getByPlaceholderText('Type the url')
    expect(inputUrl).toBeInTheDocument()

    const inputLabel = screen.getByPlaceholderText(/type the label/i)
    expect(inputLabel).toBeInTheDocument()

    const submitButton = screen.getByRole('button')
    expect(submitButton).toBeInTheDocument()
  })

  it('validate input data on submit', async () => {
    const {user} = await waitFor(() =>
      setup(<AddLinkForm saveLink={onAddLinkMock} />),
    )
    const mockData = {
      url: faker.image.urlLoremFlickr(),
      label: faker.word.words(2),
    }

    const inputUrl = screen.getByPlaceholderText(/type the url/i)
    await user.type(inputUrl, mockData.url)

    const inputLabel = screen.getByPlaceholderText(/type the label/i)
    await user.type(inputLabel, mockData.label)

    const submitButton = screen.getByRole('button')
    await user.click(submitButton)

    expect(onAddLinkMock).toHaveBeenCalledWith({
      label: mockData.label,
      url: mockData.url,
    })
  })

  it('should not submit without all fields filled', async () => {
    const {user} = await waitFor(() =>
      setup(<AddLinkForm saveLink={onAddLinkMock} />),
    )

    const inputLabel = screen.getByPlaceholderText(/type the label/i)
    await user.type(inputLabel, faker.word.words(2))

    const submitButton = screen.getByRole('button')
    await user.click(submitButton)

    expect(onAddLinkMock).not.toHaveBeenCalled()
  })
})

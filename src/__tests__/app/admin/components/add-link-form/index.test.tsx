import {makeLink, setup} from '@/__tests__/utils'
import {AddLinkForm} from '@/app/admin/components'
import {cleanup, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'

const onAddLinkMock = jest.fn((data: any) => {
  return Promise.resolve(data)
})

// jest.mock('@/utils/debouce.ts')

describe('Add Link Form Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('render form with all fields', async () => {
    const linkMock = makeLink()

    await waitFor(() =>
      setup(<AddLinkForm saveLink={onAddLinkMock} link={linkMock} />),
    )

    const inputUrl = screen.getByPlaceholderText('Type the url')
    const inputLabel = screen.getByPlaceholderText(/type the label/i)

    expect(inputUrl).toBeInTheDocument()
    expect(inputLabel).toBeInTheDocument()
  })

  it.todo('validate input data on submit')

  it.todo('should not submit without all fields filled')
})

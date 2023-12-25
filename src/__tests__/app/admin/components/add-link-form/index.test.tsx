import {makeLink, setup} from '@/__tests__/utils'
import {AddLinkForm} from '@/app/admin/components'
import {Link} from '@/models'
import {faker} from '@faker-js/faker'
import {cleanup, screen, waitFor} from '@testing-library/react'

const makeSUT = (link?: Link) => {
  const linkMock = link ?? makeLink()

  const onAddLinkMock = jest.fn((data: any) => Promise.resolve(data))

  return setup(<AddLinkForm saveLink={onAddLinkMock} link={linkMock} />)
}

describe('Add Link Form Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('render form with all fields', async () => {
    await waitFor(() => makeSUT())

    const inputUrl = screen.getByPlaceholderText('Type the url')
    const inputLabel = screen.getByPlaceholderText(/type the label/i)

    expect(inputUrl).toBeInTheDocument()
    expect(inputLabel).toBeInTheDocument()
  })

  it('should show errors when fields are filled wrong', async () => {
    const link: Link = {label: '', url: '', id: faker.string.uuid(), order: 0}
    const {user} = await waitFor(() => makeSUT(link))

    const inputLabel = screen.getByPlaceholderText(/type the label/i)
    const inputUrl = screen.getByPlaceholderText('Type the url')

    expect(inputLabel).toHaveValue('')
    expect(inputUrl).toHaveValue('')

    await user.type(inputLabel, 'ab')
    await user.type(inputUrl, 'someurl.com')

    await waitFor(() => {
      const errorMessages = document.querySelectorAll('form p')

      expect(errorMessages).toHaveLength(2)
    })
  })
})

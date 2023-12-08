import 'next-router-mock'

import {setup} from '@/__tests__/utils'
import {Header} from '@/app/admin/components/header'
import {screen} from '@testing-library/react'

import '@testing-library/jest-dom'
import {makeUser} from '@/__tests__/utils/mocks'

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe('Header component', () => {
  it('render component with logo and user data', () => {
    const userMock = makeUser()

    setup(<Header user={userMock} />)

    const header = screen.getByText('Lnktree admin')
    expect(header).toBeInTheDocument

    const userName = screen.getByText(userMock.name)
    expect(userName.textContent).toBe(userMock.name)

    const profilePicture = screen.getByRole('img')
    expect(profilePicture).toBeInTheDocument
  })

  it('render component without user image', () => {
    const userMock = makeUser()

    setup(<Header user={userMock} />)

    const header = screen.getByText('Lnktree admin')
    expect(header).toBeInTheDocument

    const userName = screen.getByText(userMock.name || '')
    expect(userName.textContent).toBe(userMock.name)

    const profilePicture = screen.queryByRole('img')
    expect(profilePicture).not.toBeInTheDocument
  })

  it('render component without user name', () => {
    const userMock = makeUser(undefined, '')

    setup(<Header user={userMock} />)

    const header = screen.getByText('Lnktree admin')
    expect(header).toBeInTheDocument

    const userName = document.querySelector('header > div > div > span')
    expect(userName).toBeEmptyDOMElement()

    const profilePicture = screen.getByRole('img')
    expect(profilePicture).toBeInTheDocument()
  })
})

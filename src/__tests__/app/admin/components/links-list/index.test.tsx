import * as firestore from 'firebase/firestore'

import {makeLink, makeUser, setup} from '@/__tests__/utils'
import '@testing-library/jest-dom'
import {LinksList} from '@/app/admin/components/links-list'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/models'
import {faker} from '@faker-js/faker'
import {cleanup, screen} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  addDoc: jest.fn(),
}))

jest.mock('@/app/admin/context/smartphone-context', () => {
  return {
    useSmartphone: () => {
      return {
        reloadSmartphoneList: jest.fn(),
      }
    },
  }
})

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()
  const sut = setup(<LinksList user={userMock} />)
  return {userMock, ...sut}
}

const renderWithItems = (amount: number = 2) => {
  const linksMock = Array.from({length: amount}).map(() => makeLink())

  const responseMock = linksMock.map(link => ({
    data: () => link,
    id: faker.string.uuid(),
  }))

  jest.spyOn(firestore, 'query').mockImplementation()
  jest.spyOn(firestore, 'collection').mockImplementation()

  jest
    .spyOn(firestore, 'onSnapshot')
    .mockImplementationOnce((query: any, callback: any) => {
      callback(responseMock)
      return jest.fn()
    })

  return {
    linksMock,
    responseMock,
  }
}

describe('Links List component', () => {
  beforeEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('render component empty', () => {
    makeSUT()

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li')).toHaveLength(0)
  })

  it('render component with 2 items', () => {
    const {linksMock} = renderWithItems()
    makeSUT()

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li').length).toBe(2)

    const firstItem = list.querySelectorAll('li')[0]
    const label = firstItem.querySelectorAll('input')[2]
    const url = firstItem.querySelectorAll('input')[3]

    expect(label).toHaveValue(linksMock[0].label)
    expect(url).toHaveValue(linksMock[0].url)
  })

  it('should delete link from the list', async () => {
    renderWithItems()
    jest.spyOn(firestore, 'doc').mockImplementation()
    jest.spyOn(firestore, 'deleteDoc').mockImplementation()

    const {user} = makeSUT()

    const list = screen.getByRole('list')
    const firstItem = list.children[1]
    const deleteBtn = firstItem.querySelector('[data-testid=delete-link-btn]')

    if (!deleteBtn) return fail()

    await user.click(deleteBtn)

    expect(deleteBtn).toBeVisible()
    expect(firestore.doc).toHaveBeenCalledTimes(1)
    expect(firestore.deleteDoc).toHaveBeenCalledTimes(1)
  })

  it('should create a new link', async () => {
    renderWithItems(1)

    const {user} = makeSUT()

    jest.spyOn(firestore, 'doc').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'collection').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'addDoc').mockImplementationOnce(jest.fn())

    // add a link
    const addLinkBtn = screen.getByText(/add link/i)

    await user.click(addLinkBtn)

    authStore.setUser({...makeUser()})

    expect(firestore.addDoc).toHaveBeenCalledTimes(1)

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li').length).toBe(1)
  })
})

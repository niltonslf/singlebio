import * as firestore from 'firebase/firestore'

import {fail, makeLink, makeUser, setup} from '@/__tests__/__helpers__'
import {LinksList} from '@/app/admin/components/links-list'
import {SmartphoneProvider} from '@/app/admin/context/smartphone-context'
import {authStore} from '@/app/auth/context/auth-store'
import {Link, User} from '@/models'
import {faker} from '@faker-js/faker'
import {act, cleanup, screen} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  addDoc: jest.fn(),
}))

jest.mock('@/app/admin/context/smartphone-context', () => {
  return {
    ...jest.requireActual('@/app/admin/context/smartphone-context'),
    useSmartphone: () => {
      return {
        reloadSmartphoneList: jest.fn(),
      }
    },
  }
})

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()
  const sut = setup(
    <SmartphoneProvider>
      <LinksList user={userMock} />
    </SmartphoneProvider>,
  )
  return {userMock, ...sut}
}

const renderWithItems = (linksMock: Link[]) => {
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
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('render component empty', () => {
    makeSUT()

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li')).toHaveLength(0)
  })

  it('render component with 2 items', () => {
    const {linksMock} = renderWithItems([
      {...makeLink(), order: 0},
      {...makeLink(), order: 1},
    ])

    makeSUT()

    const list = screen.getByRole('list')
    const items = list.querySelectorAll('li')

    expect(items.length).toBe(2)

    const firstItem = items[0]
    const label = firstItem.querySelectorAll('input')[2]
    const url = firstItem.querySelectorAll('input')[3]

    expect(label).toHaveValue(linksMock[1].label)
    expect(url).toHaveValue(linksMock[1].url)
  })

  it('should delete link from the list', async () => {
    renderWithItems([makeLink(), makeLink()])

    jest.spyOn(firestore, 'doc').mockImplementation(jest.fn())
    jest.spyOn(firestore, 'deleteDoc').mockImplementation(jest.fn())

    const {user} = makeSUT()

    const list = screen.getByRole('list')

    const firstItem = list.children[0]
    const deleteBtn = firstItem.querySelector('[data-testid=delete-link-btn]')

    if (!deleteBtn) return fail()

    await user.click(deleteBtn)

    expect(deleteBtn).toBeVisible()
    expect(firestore.doc).toHaveBeenCalledTimes(1)
    expect(firestore.deleteDoc).toHaveBeenCalledTimes(1)
  })

  it('should create a new link', async () => {
    renderWithItems([makeLink()])

    const {user} = makeSUT()

    jest.spyOn(firestore, 'doc').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'collection').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'addDoc').mockImplementationOnce(jest.fn())

    // add a link
    const addLinkBtn = screen.getByText(/add link/i)

    await user.click(addLinkBtn)

    // force trigger useEffect
    authStore.setUser({...makeUser()})

    expect(firestore.addDoc).toHaveBeenCalledTimes(1)

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li').length).toBe(1)
  })

  // ? i'm not happy with this test
  it('should save the new link', async () => {
    renderWithItems([{id: '', label: '', url: '', order: 0}])

    const {user} = makeSUT()

    jest.spyOn(firestore, 'doc').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'collection').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'addDoc').mockImplementationOnce(jest.fn())

    jest.spyOn(firestore, 'setDoc')

    // add a link
    const addLinkBtn = screen.getByText(/add link/i)

    await user.click(addLinkBtn)

    // force trigger useEffect
    authStore.setUser({...makeUser()})

    expect(firestore.addDoc).toHaveBeenCalledTimes(1)

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li').length).toBe(1)

    // test save new link

    const idInput = list.querySelectorAll('input')[0]
    const orderInput = list.querySelectorAll('input')[1]
    const labelInput = list.querySelectorAll('input')[2]
    const urlInput = list.querySelectorAll('input')[3]

    await user.type(idInput, '1')
    await user.type(orderInput, '0')
    await user.type(labelInput, 'Google')
    await user.type(urlInput, 'http://google.com.br')

    await act(async () => {
      await new Promise(r => setTimeout(r, 600))

      expect(firestore.setDoc).toHaveBeenCalledTimes(1)
    })
  })
})

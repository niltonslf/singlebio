import * as firestore from 'firebase/firestore'

import {fail, makeLink, makeUser, setup} from '@/__tests__'
import {LinksSection} from '@/app/admin/components'
import {PageLink, User} from '@/domain/models'
import {faker} from '@faker-js/faker'
import {cleanup, screen, waitFor} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  addDoc: jest.fn(),
}))

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()
  const sut = setup(<LinksSection user={userMock} />)
  return {userMock, ...sut}
}

const renderWithItems = (linksMock: PageLink[]) => {
  const responseMock = {
    docs: linksMock.map(link => ({
      data: () => link,
      id: faker.string.uuid(),
    })),
    size: linksMock.length,
  }

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

  it('render component empty', async () => {
    renderWithItems([])

    await waitFor(() => makeSUT())

    const list = screen.getByTestId('empty-list')
    expect(list).toBeInTheDocument()
  })

  it.todo('render component with 2 items')

  it.todo('should delete link from the list')

  it.todo('should create a new link')

  it.todo('should save the new link')

  // TODO: redo this test
  it.skip('should change the order using drag and drop', async () => {
    renderWithItems([
      {...makeLink(), order: 0},
      {...makeLink(), order: 1},
      {...makeLink(), order: 2},
      {...makeLink(), order: 3},
    ])

    const {user} = makeSUT()

    jest.spyOn(firestore, 'doc').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'collection').mockImplementationOnce(jest.fn())
    jest.spyOn(firestore, 'addDoc').mockImplementationOnce(jest.fn())

    jest.spyOn(firestore, 'setDoc').mockImplementation(jest.fn())

    const list = screen.getByRole('list')
    const items = list.querySelectorAll('li')

    const first = items[0]
    const firstHandler = first.querySelector('button')

    const second = items[1]
    const secondHandler = second.querySelector('button')

    const third = items[2]
    const thirdHandler = third.querySelector('button')

    const last = items[3]
    const lastHandler = last.querySelector('button')

    if (!firstHandler || !lastHandler || !secondHandler || !thirdHandler)
      return fail()

    // Drag up
    await user.pointer([
      {
        keys: '[MouseLeft>]',
        target: lastHandler,
      },
      {
        pointerName: 'mouse',
        target: firstHandler,
      },
      '[/MouseLeft]',
    ])
    // wait reload the smartphone
    await new Promise(resolve => setTimeout(resolve, 600))

    // drag down
    await user.pointer([
      {
        keys: '[MouseLeft>]',
        target: lastHandler,
      },
      {
        pointerName: 'mouse',
        target: secondHandler,
      },
      '[/MouseLeft]',
    ])
  })
})

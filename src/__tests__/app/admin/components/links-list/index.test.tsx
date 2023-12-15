import * as firestore from 'firebase/firestore'

import {fail, makeLink, makeUser, setup} from '@/__tests__/utils'
import '@testing-library/jest-dom'
import {LinksList} from '@/app/admin/components/links-list'
import {User} from '@/models'
import {faker} from '@faker-js/faker'
import {cleanup, screen} from '@testing-library/react'

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
}))

jest.mock('@/app/admin/context/admin-context', () => {
  return {
    useAdmin: () => {
      return {
        reloadSmartphoneList: jest.fn(),
        setSmartphoneRef: jest.fn(),
      }
    },
  }
})

const makeSUT = (user?: User) => {
  const userMock = user ?? makeUser()
  const sut = setup(<LinksList user={userMock} />)
  return {userMock, ...sut}
}

describe('Links List component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('render component empty', () => {
    makeSUT()

    const list = screen.getByRole('list')
    expect(list.querySelectorAll('li')).toHaveLength(0)
  })

  it.skip('render component with 2 items', () => {
    const linksMock = [makeLink(), makeLink()]

    const responseMock = linksMock.map(link => ({
      data: () => link,
      id: faker.string.uuid(),
    }))

    jest
      .spyOn(firestore, 'onSnapshot')
      .mockImplementation((query: any, callback: any) => {
        callback(responseMock)
        return jest.fn()
      })

    makeSUT()

    const list = screen.getByRole('list')
    expect(list.childElementCount).toBe(2)

    const firstItem = list.querySelectorAll('li')[0]
    const label = firstItem.querySelectorAll('input')[1]
    const url = firstItem.querySelectorAll('input')[2]

    expect(label).toHaveValue(linksMock[0].label)
    expect(url).toHaveValue(linksMock[0].url)
  })

  it('should delete link from the list', async () => {
    const linksMock = [makeLink(), makeLink()]

    const responseMock = linksMock.map(link => ({
      data: () => link,
      id: faker.string.uuid(),
    }))

    jest
      .spyOn(firestore, 'onSnapshot')
      .mockImplementation((query: any, callback: any) => {
        callback(responseMock)
        return jest.fn()
      })

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
})

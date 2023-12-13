import * as firestore from 'firebase/firestore'

import {makeUser, setup} from '@/__tests__/utils'
import {LinksList} from '@/app/admin/components/links-list'
import {faker} from '@faker-js/faker'
import {cleanup, screen} from '@testing-library/react'

import '@testing-library/jest-dom'

jest.mock('firebase/firestore', () => {
  return {__esModule: true, ...jest.requireActual('firebase/firestore')}
})

describe('Links List component', () => {
  beforeEach(() => {
    cleanup()
  })

  it('render component empty', () => {
    const userMock = makeUser()

    setup(<LinksList user={userMock} />)

    const list = screen.getByRole('list')
    expect(list.childElementCount).toBe(0)
  })

  it('render component with 2 items', () => {
    const userMock = makeUser()

    const makeLink = (label?: string, url?: string) => {
      return {
        label: label || faker.word.words(2),
        url: url || faker.internet.url(),
      }
    }

    const linksMock = [
      makeLink('instagram', 'http://instagram.com'),
      makeLink(),
    ]

    const responseMock = linksMock.map(link => ({data: () => link}))

    jest
      .spyOn(firestore, 'onSnapshot')
      .mockImplementation((query: any, callback: any) => {
        callback(responseMock)
        return jest.fn()
      })

    setup(<LinksList user={userMock} />)

    const list = screen.getByRole('list')

    const firstItem = list.children[1]

    expect(list.childElementCount).toBe(2)
    expect(firstItem.querySelector('span')?.textContent).toBe(linksMock[0].url)
    expect(firstItem.textContent).toContain(linksMock[0].label)
  })
})

import {User} from 'firebase/auth'

import {parseToUser} from '@/utils'
import {faker} from '@faker-js/faker'

import {makeFbUser} from '../__helpers__'

describe('parseToUser', () => {
  it('returns a user object', () => {
    const firebaseUser = makeFbUser()

    const user = parseToUser(firebaseUser)

    expect(user).toEqual({
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      pictureUrl: firebaseUser.photoURL,
      uid: firebaseUser.uid,
      username: '',
    })
  })

  it('throw erro when provided an user without email', () => {
    const firebaseUser = {
      displayName: faker.person.fullName(),
      photoURL: faker.image.urlLoremFlickr(),
      uid: faker.string.uuid(),
    } as User

    expect(() => parseToUser(firebaseUser)).toThrowError()
  })

  it('return a user object without picture and name', () => {
    const firebaseUser = {
      email: faker.internet.email(),
      uid: faker.string.uuid(),
    } as User

    const user = parseToUser(firebaseUser)

    expect(user).toEqual({
      email: firebaseUser.email,
      name: '',
      pictureUrl: '',
      uid: firebaseUser.uid,
      username: '',
    })
  })
})

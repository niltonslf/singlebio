import {User} from 'firebase/auth'

import {makeFbUser, makeUserTheme} from '@/__tests__'
import {parseToUser} from '@/utils'
import {faker} from '@faker-js/faker'

describe('parseToUser', () => {
  it('returns a user object', () => {
    const firebaseUser = makeFbUser()
    const userTheme = makeUserTheme()

    const user = parseToUser(firebaseUser, userTheme)

    expect(user).toEqual({
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      pictureUrl: firebaseUser.photoURL,
      uid: firebaseUser.uid,
      theme: userTheme,
    })
  })
  it('returns a user object with theme', () => {
    const firebaseUser = makeFbUser()
    const theme = makeUserTheme()

    const user = parseToUser(firebaseUser, theme)

    expect(user).toEqual({
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      pictureUrl: firebaseUser.photoURL,
      uid: firebaseUser.uid,
      theme,
    })
  })

  it('throw erro when provided an user without email', () => {
    const firebaseUser = {
      displayName: faker.person.fullName(),
      photoURL: faker.image.urlLoremFlickr(),
      uid: faker.string.uuid(),
    } as User

    expect(() => parseToUser(firebaseUser, makeUserTheme())).toThrowError()
  })

  it('return a user object without picture and name', () => {
    const firebaseUser = {
      email: faker.internet.email(),
      uid: faker.string.uuid(),
    } as User
    const userTheme = makeUserTheme()

    const user = parseToUser(firebaseUser, userTheme)

    expect(user).toEqual({
      email: firebaseUser.email,
      name: firebaseUser?.email?.split('@')[0],
      pictureUrl: '',
      uid: firebaseUser.uid,
      theme: userTheme,
    })
  })
})

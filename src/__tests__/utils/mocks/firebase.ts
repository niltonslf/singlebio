import {User as FbUser} from 'firebase/auth'

import {User} from '@/models'
import {faker} from '@faker-js/faker'

type FbUserResponseMockReturn<T = any> = {
  ref: {path: string}
  data: () => T
}

type LinkItemResponseMockReturn = {
  data: () => {
    label: string
    url: string
  }
}

export const makeFbUser = () => {
  return {
    uid: faker.string.uuid(),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    photoURL: faker.image.urlLoremFlickr(),
  } as FbUser
}

export const fbUserResponseMock = (
  user: User,
): FbUserResponseMockReturn<User> => {
  return {
    ref: {path: faker.internet.url()},
    data: (): User => user,
  }
}

export const linkItemResponseMock = (): LinkItemResponseMockReturn => {
  return {
    data: () => ({
      label: faker.word.words(2),
      url: faker.image.urlLoremFlickr(),
    }),
  }
}

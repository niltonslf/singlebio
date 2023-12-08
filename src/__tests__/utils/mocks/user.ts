import {faker} from '@faker-js/faker'

export const makeUser = () => {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    pictureUrl: faker.image.urlLoremFlickr(),
    uid: faker.string.uuid(),
    userName: faker.internet.userName(),
  }
}

import {faker} from '@faker-js/faker'

export const makeUser = (
  email?: string,
  name?: string,
  pictureUrl?: string,
  uid?: string,
  username?: string,
) => {
  return {
    email: email ?? faker.internet.email(),
    name: name ?? faker.person.fullName(),
    pictureUrl: pictureUrl ?? faker.image.urlLoremFlickr(),
    uid: uid ?? faker.string.uuid(),
    username: username ?? faker.internet.userName(),
  }
}

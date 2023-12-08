import {User} from '@/models'
import {faker} from '@faker-js/faker'

type MakeUserProps = Partial<User>

export const makeUser = (
  email?: string,
  name?: string,
  pictureUrl?: string,
  uid?: string,
  userName?: string,
) => {
  return {
    email: email ?? faker.internet.email(),
    name: name ?? faker.person.fullName(),
    pictureUrl: pictureUrl ?? faker.image.urlLoremFlickr(),
    uid: uid ?? faker.string.uuid(),
    userName: userName ?? faker.internet.userName(),
  }
}

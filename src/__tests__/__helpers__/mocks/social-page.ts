import {SocialPage} from '@/domain/models'
import {faker} from '@faker-js/faker'

export const makeSocialPage = (
  id?: string,
  name?: string,
  url?: string,
  order?: number,
): SocialPage => {
  return {
    id: id ?? faker.string.uuid(),
    name: name ?? faker.person.firstName(),
    url: url ?? faker.internet.url(),
    order: order ?? faker.number.int(),
  }
}

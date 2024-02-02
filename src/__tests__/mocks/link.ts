import {PageLink} from '@/domain/models'
import {faker} from '@faker-js/faker'

export const makeLink = (
  id?: string,
  label?: string,
  url?: string,
  order?: number,
): PageLink => {
  return {
    id: id ?? faker.string.uuid(),
    label: label ?? faker.word.words(2),
    url: url ?? faker.internet.url(),
    order: order ?? faker.number.int(),
  }
}

import {faker} from '@faker-js/faker'

export const makeLink = (id?: string, label?: string, url?: string) => {
  return {
    id: id || faker.string.uuid(),
    label: label || faker.word.words(2),
    url: url || faker.internet.url(),
  }
}

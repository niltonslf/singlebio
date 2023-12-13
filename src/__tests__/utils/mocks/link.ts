import {faker} from '@faker-js/faker'

export const makeLink = (label?: string, url?: string) => {
  return {
    label: label || faker.word.words(2),
    url: url || faker.internet.url(),
  }
}

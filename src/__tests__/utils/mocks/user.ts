import {User, UserTheme} from '@/models'
import {faker} from '@faker-js/faker'

export const makeUser = (
  email?: string,
  name?: string,
  pictureUrl?: string,
  uid?: string,
  username?: string,
  theme?: UserTheme,
): User => {
  return {
    email: email ?? faker.internet.email(),
    name: name ?? faker.person.fullName(),
    pictureUrl: pictureUrl ?? faker.image.urlLoremFlickr(),
    uid: uid ?? faker.string.uuid(),
    username: username ?? faker.internet.userName(),
    theme: theme,
  }
}

export const makeUserTheme = (
  backgroundColor?: string,
  backgroundImage?: string,
  buttonBackground?: string,
  buttonTextColor?: string,
  usernameColor?: string,
): UserTheme => {
  return {
    backgroundColor:
      backgroundColor ?? faker.color.rgb({format: 'css', includeAlpha: true}),
    backgroundImage: backgroundImage ?? faker.image.urlLoremFlickr(),
    buttonBackground:
      buttonBackground ?? faker.color.rgb({format: 'css', includeAlpha: true}),
    buttonTextColor:
      buttonTextColor ?? faker.color.rgb({format: 'css', includeAlpha: true}),
    usernameColor:
      usernameColor ?? faker.color.rgb({format: 'css', includeAlpha: true}),
  }
}

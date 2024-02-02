import {User, UserTheme} from '@/domain/models'
import {faker} from '@faker-js/faker'

export const makeUser = (user: Partial<User> = {}): Required<User> => {
  return {
    email: user?.email ?? faker.internet.email(),
    name: user?.name ?? faker.person.fullName(),
    pictureUrl: user?.pictureUrl ?? faker.image.urlLoremFlickr(),
    uid: user?.uid ?? faker.string.uuid(),
    username: user?.username ?? faker.internet.userName(),
    theme: user?.theme ?? makeUserTheme(),
    bio: user?.bio ?? faker.lorem.word(20),
    coverUrl: user?.coverUrl ?? faker.image.urlLoremFlickr(),
  }
}

export const makeUserTheme = ({
  backgroundColor,
  buttonBackground,
  buttonTextColor,
  usernameColor,
  socialDefaultColor,
  socialIconColor,
  buttonStyle,
  name,
}: Partial<UserTheme> = {}): UserTheme => {
  return {
    backgroundColor: backgroundColor ?? faker.color.rgb({format: 'css'}),
    buttonBackground: buttonBackground ?? faker.color.rgb({format: 'css'}),
    buttonTextColor: buttonTextColor ?? faker.color.rgb({format: 'css'}),
    usernameColor: usernameColor ?? faker.color.rgb({format: 'css'}),
    socialDefaultColor: socialDefaultColor ?? false,
    socialIconColor: socialIconColor ?? faker.color.rgb({format: 'css'}),
    buttonStyle: buttonStyle ?? 'circle',
    name: name ?? 'default',
  }
}

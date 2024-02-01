import {ThemeButtonStyles, User, UserTheme} from '@/domain/models'
import {faker} from '@faker-js/faker'

type MakeUserProps = {
  email?: string
  name?: string
  pictureUrl?: string
  uid?: string
  username?: string
  theme?: UserTheme
  bio?: string
}

type MakeUserThemeProps = {
  backgroundColor?: string
  backgroundImage?: string
  buttonBackground?: string
  buttonTextColor?: string
  usernameColor?: string
  socialDefaultColor?: boolean
  socialIconColor?: string
  buttonStyle?: ThemeButtonStyles
  name?: string
}

export const makeUser = (user: MakeUserProps = {}): Required<User> => {
  return {
    email: user?.email ?? faker.internet.email(),
    name: user?.name ?? faker.person.fullName(),
    pictureUrl: user?.pictureUrl ?? faker.image.urlLoremFlickr(),
    uid: user?.uid ?? faker.string.uuid(),
    username: user?.username ?? faker.internet.userName(),
    theme: user?.theme ?? makeUserTheme(),
    bio: user?.bio ?? faker.lorem.word(20),
    features: {
      github: {
        username: faker.internet.userName(),
      },
    },
  }
}

export const makeUserTheme = ({
  backgroundColor,
  backgroundImage,
  buttonBackground,
  buttonTextColor,
  usernameColor,
  socialDefaultColor,
  socialIconColor,
  buttonStyle,
  name,
}: MakeUserThemeProps = {}): UserTheme => {
  return {
    backgroundColor: backgroundColor ?? faker.color.rgb({format: 'css'}),
    backgroundImage: backgroundImage ?? faker.image.urlLoremFlickr(),
    buttonBackground: buttonBackground ?? faker.color.rgb({format: 'css'}),
    buttonTextColor: buttonTextColor ?? faker.color.rgb({format: 'css'}),
    usernameColor: usernameColor ?? faker.color.rgb({format: 'css'}),
    socialDefaultColor: socialDefaultColor ?? false,
    socialIconColor: socialIconColor ?? faker.color.rgb({format: 'css'}),
    buttonStyle: buttonStyle ?? 'circle',
    name: name ?? 'default',
  }
}

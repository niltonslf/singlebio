import {CSSProperties, HTMLAttributes, ReactNode} from 'react'

import {
  PageLink,
  SocialPage,
  User,
  UserFeature,
  UserTheme,
} from '@/domain/models'

export type ThemeProps = {
  user: User
  links: PageLink[]
  socialPages?: SocialPage[]
  theme: UserTheme
  features: UserFeature[]
}

export type ThemeButtonProps = {
  children?: ReactNode
  className: HTMLAttributes<HTMLElement>['className']
  styles?: CSSProperties
}

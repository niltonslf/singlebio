import {CSSProperties, HTMLAttributes, ReactNode} from 'react'

import {Link, SocialPage, User, UserTheme} from '@/domain/models'

export type ThemeProps = {
  user: User
  links: Link[]
  socialPages?: SocialPage[]
  theme: UserTheme
}

export type ThemeButtonProps = {
  children: ReactNode
  className: HTMLAttributes<HTMLElement>['className']
  styles?: CSSProperties
}

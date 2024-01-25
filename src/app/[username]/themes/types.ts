import {CSSProperties, HTMLAttributes, ReactNode} from 'react'

import {Link, SocialPage, User} from '@/domain/models'

export type ThemeProps = {
  user: User
  links?: Link[]
  socialPages?: SocialPage[]
}

export type ThemeButtonProps = {
  children: ReactNode
  className: HTMLAttributes<HTMLElement>['className']
  styles?: CSSProperties
}

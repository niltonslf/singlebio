import {CSSProperties, HTMLAttributes, ReactNode} from 'react'

import {PageStylesObject} from '@/app/[username]/utils'
import {Link, SocialPage, User} from '@/domain/models'

export type ThemeProps = {
  pageStyles: PageStylesObject
  links: Link[]
  socialPages: SocialPage[]
  user: User
}

export type ThemeButtonProps = {
  children: ReactNode
  className: HTMLAttributes<HTMLElement>['className']
  styles?: CSSProperties
}

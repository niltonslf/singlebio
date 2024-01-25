import {PageStylesObject} from '@/app/[username]/utils'
import {Link, SocialPage, User} from '@/domain/models'

export type ThemeProps = {
  pageStyles: PageStylesObject
  links: Link[]
  socialPages: SocialPage[]
  user: User
}

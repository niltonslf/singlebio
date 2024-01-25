import {CSSProperties} from 'react'

import {LinkCard} from '@/app/[username]/components/link-card'
import {Link, User} from '@/domain/models'

type PageLinks01Props = {
  links?: Link[]
  user: User
}

export const PageLinks01 = ({links, user}: PageLinks01Props) => {
  const styles: CSSProperties = {}

  if (user.theme?.buttonBackground) {
    styles.backgroundColor = user.theme?.buttonBackground
  }

  if (user.theme?.buttonTextColor) {
    styles.color = user.theme?.buttonTextColor
  }

  return (
    <LinkCard>
      {links &&
        links?.length > 0 &&
        links.map(link => {
          return (
            <LinkCard.Item
              key={link.url}
              path={link.url || '#'}
              variant={user.theme?.buttonStyle}
              styles={styles}>
              {link.label}
            </LinkCard.Item>
          )
        })}
    </LinkCard>
  )
}

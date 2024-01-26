import {CSSProperties} from 'react'

import {LinkCard} from '@/app/[username]/components/link-card'
import {Link, UserTheme} from '@/domain/models'

type PageLinks01Props = {
  links: Link[]
  theme: UserTheme
}

export const PageLinks01 = ({links, theme}: PageLinks01Props) => {
  const styles: CSSProperties = {}

  if (theme?.buttonBackground) {
    styles.backgroundColor = theme?.buttonBackground
  }

  if (theme?.buttonTextColor) {
    styles.color = theme?.buttonTextColor
  }

  return (
    <LinkCard>
      {links &&
        links?.length > 0 &&
        links.map(link => {
          return (
            <LinkCard.Item
              key={link.id}
              link={link}
              variant={theme?.buttonStyle}
              styles={styles}>
              {link.label}
            </LinkCard.Item>
          )
        })}
    </LinkCard>
  )
}

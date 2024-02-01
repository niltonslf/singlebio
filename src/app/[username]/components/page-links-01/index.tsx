import {CSSProperties} from 'react'

import {LinkCard, LinkCardItem} from '@/app/[username]/components'
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
      {links?.length > 0 &&
        links.map(link => {
          return (
            <LinkCardItem
              key={link.id}
              link={link}
              variant={theme?.buttonStyle}
              styles={styles}>
              {link.label}
            </LinkCardItem>
          )
        })}
    </LinkCard>
  )
}

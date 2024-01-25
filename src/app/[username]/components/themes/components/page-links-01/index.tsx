import {PageStylesObject} from '@/app/[username]/utils'
import {LinkCard} from '@/app/components'
import {Link} from '@/domain/models'

type PageLinks01Props = {
  links: Link[]
  pageStyles: PageStylesObject
}

export const PageLinks01 = ({links, pageStyles}: PageLinks01Props) => {
  return (
    <LinkCard>
      {links.length > 0 &&
        links.map(link => {
          return (
            <LinkCard.Item
              key={link.url}
              path={link.url || '#'}
              className={pageStyles.buttonStyle?.value}
              bgColor={pageStyles?.buttonBackground?.value}
              textColor={pageStyles?.buttonTextColor?.value}>
              {link.label}
            </LinkCard.Item>
          )
        })}
    </LinkCard>
  )
}

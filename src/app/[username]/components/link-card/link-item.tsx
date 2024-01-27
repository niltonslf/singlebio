import clsx from 'clsx'
import Link from 'next/link'
import {CSSProperties, ReactNode} from 'react'

import {themeButtonStyle} from '@/constants/theme-options'
import {Link as LinkPage, ThemeButtonStyles} from '@/domain/models'
import {parseExternalUrl} from '@/utils'

type LinkItemProps = {
  link: LinkPage
  children: ReactNode
  variant?: ThemeButtonStyles
  styles?: CSSProperties
}

export const LinkItem = ({link, children, variant, styles}: LinkItemProps) => {
  const Button = themeButtonStyle[variant || 'default'].component

  return (
    <Link
      href={parseExternalUrl(link.url)}
      target='_blank'
      id='page-link-item'
      data-id={link.id}>
      <Button
        className={clsx([
          'btn btn-md flex h-auto w-full flex-wrap items-center justify-center bg-white p-3 text-center font-medium text-base-200 shadow-md transition-all hover:scale-95 hover:bg-white hover:text-inherit md:py-5',
        ])}
        styles={styles}>
        {children}
      </Button>
    </Link>
  )
}

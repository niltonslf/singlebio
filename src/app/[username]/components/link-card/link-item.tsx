import clsx from 'clsx'
import Link from 'next/link'
import {CSSProperties, ReactNode} from 'react'

import {themeButtonStyle} from '@/app/[username]/constants/theme-button-options'
import {PageLink as LinkPage, ThemeButtonStyles} from '@/domain/models'
import {parseExternalUrl} from '@/utils'

type LinkCardItemProps = {
  link: LinkPage
  children: ReactNode
  variant?: ThemeButtonStyles
  styles?: CSSProperties
}

export const LinkCardItem = ({
  link,
  children,
  variant,
  styles,
}: LinkCardItemProps) => {
  const Button = themeButtonStyle[variant ?? 'default'].component

  return (
    <Link
      data-id={link.id}
      href={parseExternalUrl(link.url)}
      target='_blank'
      id='page-link-item'>
      <Button
        className={clsx([
          'btn btn-md flex h-auto w-full flex-wrap items-center justify-center bg-white p-3 text-center font-medium text-base-200 shadow-md transition-all hover:scale-95 hover:bg-white hover:text-inherit md:py-5',
        ])}
        styles={styles ?? {}}>
        {children}
      </Button>
    </Link>
  )
}

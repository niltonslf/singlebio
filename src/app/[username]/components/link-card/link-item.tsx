import clsx from 'clsx'
import Link from 'next/link'
import {CSSProperties, ReactNode} from 'react'

import {themeButtonStyle} from '@/constants/theme-options'
import {ThemeButtonStyles} from '@/domain/models'
import {parseExternalUrl} from '@/utils'

type LinkItemProps = {
  path: string
  children: ReactNode
  variant?: ThemeButtonStyles
  styles?: CSSProperties
}

export const LinkItem = ({path, children, variant, styles}: LinkItemProps) => {
  const Button = themeButtonStyle[variant || 'default'].component

  return (
    <Link
      href={parseExternalUrl(path)}
      target='_blank'
      className='user-link-item'>
      <Button
        className={clsx([
          'btn btn-md flex h-auto w-full flex-wrap items-center justify-center bg-white p-3 text-center font-medium text-base-200 shadow-md transition-all hover:scale-95 hover:text-base-content md:py-5',
        ])}
        styles={styles}>
        {children}
      </Button>
    </Link>
  )
}

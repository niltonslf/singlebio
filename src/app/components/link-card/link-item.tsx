import clsx from 'clsx'
import Link from 'next/link'
import {ReactNode} from 'react'

import {parseExternalUrl} from '@/utils'

type LinkItemProps = {
  path: string
  children: ReactNode
  bgColor?: string
  textColor?: string
}

export const LinkItem = ({
  path,
  children,
  bgColor,
  textColor,
}: LinkItemProps) => {
  const styles = {} as any

  if (bgColor) {
    styles.backgroundColor = bgColor
  }

  if (textColor) {
    styles.color = textColor
  }

  return (
    <Link
      href={parseExternalUrl(path)}
      target='_blank'
      className='user-link-item'>
      <li
        className={clsx([
          'flex w-full flex-wrap items-center justify-center rounded-lg bg-white p-3 text-center font-medium text-black shadow-md transition-all hover:scale-95 md:p-5',
        ])}
        style={styles}>
        {children}
      </li>
    </Link>
  )
}

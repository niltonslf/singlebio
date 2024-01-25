import clsx from 'clsx'
import Link from 'next/link'
import {HTMLAttributes, ReactNode} from 'react'

import {parseExternalUrl} from '@/utils'

type LinkItemProps = {
  path: string
  children: ReactNode
  bgColor?: string
  textColor?: string
  className?: HTMLAttributes<HTMLElement>['className']
}

export const LinkItem = ({
  path,
  children,
  bgColor,
  textColor,
  className,
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
          'btn btn-md flex h-auto w-full flex-wrap items-center justify-center bg-white p-3 text-center font-medium text-base-200 shadow-md transition-all hover:scale-95 hover:text-base-content md:py-5',
          className,
        ])}
        style={styles}>
        {children}
      </li>
    </Link>
  )
}

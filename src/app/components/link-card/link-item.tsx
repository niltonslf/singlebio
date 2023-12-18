import clsx from 'clsx'
import Link from 'next/link'
import {ReactNode} from 'react'

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
  const styles = {
    backgroundColor: '',
    color: '',
  }

  if (bgColor) {
    styles.backgroundColor = bgColor
  }

  if (textColor) {
    styles.color = textColor
  }

  return (
    <Link href={path} target='_blank'>
      <li
        className={clsx([
          'flex w-full flex-wrap items-center justify-center rounded-lg bg-white p-3 font-medium shadow-md md:p-5',
        ])}
        style={styles}>
        {children}
      </li>
    </Link>
  )
}

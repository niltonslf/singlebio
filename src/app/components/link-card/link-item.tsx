import Link from 'next/link'
import {ReactNode} from 'react'

type LinkItemProps = {
  path: string
  children: ReactNode
}

export const LinkItem = ({path, children}: LinkItemProps) => {
  return (
    <Link href={path} target='_blank'>
      <li className='flex w-full flex-wrap items-center justify-center rounded-lg bg-white p-3 font-medium md:p-5'>
        {children}
      </li>
    </Link>
  )
}

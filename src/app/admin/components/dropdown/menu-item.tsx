import {ReactNode} from 'react'

interface MenuItemProps {
  children: ReactNode
  href?: string
  onClick?: () => void
}

export const MenuItem = ({children, href, onClick}: MenuItemProps) => {
  return (
    <li>
      <a
        href={href || '#'}
        target={onClick ? '_self' : '_blank'}
        onClick={onClick || (e => null)}
        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
        {children}
      </a>
    </li>
  )
}

import {ReactNode} from 'react'

interface MenuItemProps {
  children: ReactNode
  href?: string
  onClick?: () => void
}

export const MenuItem = ({children, href, onClick}: MenuItemProps) => {
  const styles =
    'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'

  if (href)
    return (
      <li>
        <a href={href} target={'_blank'} className={styles}>
          {children}
        </a>
      </li>
    )

  return (
    <li>
      <div onClick={onClick} className={styles}>
        {children}
      </div>
    </li>
  )
}

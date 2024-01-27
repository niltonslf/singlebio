import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {HTMLAttributes, MouseEvent, ReactNode} from 'react'

import {NavLink as NavLinkType} from '@/app/admin/components'
import {merge} from '@/utils'

type NavLinkProps = {
  children: ReactNode
  page: NavLinkType
  onClick?: () => void
  className?: HTMLAttributes<HTMLElement>['className']
}

export const NavLink = ({children, page, className, onClick}: NavLinkProps) => {
  const pathName = usePathname()

  const isCurrentPage = (currentPage: string) => pathName == currentPage

  const handleOnClick = (
    event: MouseEvent<HTMLAnchorElement>,
    page: NavLinkType,
  ) => {
    if (page.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    page.onClick?.()
    onClick?.()
  }
  return (
    <Link
      key={page.href}
      href={page.href || '#'}
      onClick={event => handleOnClick?.(event, page)}
      title={page.title}
      className={merge([
        'flex flex-row items-center gap-3 rounded-md px-3 py-2 text-sm opacity-100 transition-all hover:bg-base-100 hover:text-base-content',
        page.textColor,
        className,
        isCurrentPage(page.href) && 'bg-primary text-base-content',
        page.disabled && 'pointer-events-none cursor-not-allowed opacity-50',
      ])}>
      {children}
    </Link>
  )
}

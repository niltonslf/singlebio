'use client'

import {Home, Palette} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ReactNode} from 'react'

import {merge} from '@/utils'

type Page = {
  href: string
  title: string
  name: string
  Icon: ReactNode
}

type NavLinksProps = {
  location?: 'header' | 'dropdown'
}

const pages: Page[] = [
  {
    href: '/admin',
    title: 'go to home page',
    name: 'Home',
    Icon: <Home width={15} />,
  },
  {
    href: '/admin/appearance',
    title: 'go to appearance page',
    name: 'Appearance',
    Icon: <Palette width={15} />,
  },
]
export const NavLinks = ({location = 'header'}: NavLinksProps) => {
  const pathName = usePathname()
  const inHeader = location === 'header'
  const inDropdown = location === 'dropdown'

  const isCurrentPage = (currentPage: string) => pathName == currentPage

  return (
    <>
      {pages.map(page => (
        <Link
          key={page.href}
          href={page.href}
          title={page.title}
          className={merge([
            'item text-sm',
            isCurrentPage(page.href) && 'md:text-brand-100 ',
            inHeader &&
              'md:text-md md:flex md:flex-row md:items-center md:gap-1 md:font-semibold',
            inDropdown && 'md:!hidden',
          ])}>
          {page.Icon}
          <p>{page.name}</p>
        </Link>
      ))}
    </>
  )
}

'use client'

import {
  BarChartHorizontalBig,
  HelpCircle,
  Info,
  LayoutDashboard,
  Link2,
  Paintbrush,
  Palette,
  Settings2,
  User2,
} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {MouseEvent, ReactNode} from 'react'

import {merge} from '@/utils'

type NavLink = {
  href: string
  title: string
  name: string
  Icon: ReactNode
  disabled?: boolean
}

type NavSection = {
  label: string
  links: NavLink[]
}

type NavbarLinks = Record<string, NavSection>

type NavLinksProps = {
  onClick?: () => void
}

const navbarItems: NavbarLinks = {
  app: {
    label: 'App',
    links: [
      {
        href: '/admin/links',
        title: 'go to home page',
        name: 'Links',
        Icon: <Link2 width={18} />,
      },
      {
        href: '/admin/appearance',
        title: 'go to appearance page',
        name: 'Appearance',
        Icon: <Palette width={18} />,
      },
      {
        href: '/admin/theme',
        title: 'go to theme page',
        name: 'Theme',
        Icon: <Paintbrush width={18} />,
      },
      {
        href: '/admin/analytics',
        title: 'go to analytics page',
        name: 'Analytics',
        Icon: <BarChartHorizontalBig width={18} />,
        disabled: true,
      },
    ],
  },
  personal: {
    label: 'Personal',
    links: [
      {
        href: '/admin/profile',
        title: 'go to register page',
        name: 'Profile',
        Icon: <User2 width={18} />,
      },
      {
        href: '/admin/my-plan',
        title: 'go to plan page',
        name: 'My subscription',
        Icon: <LayoutDashboard width={18} />,
        disabled: true,
      },
    ],
  },
  settings: {
    label: 'Settings',
    links: [
      {
        href: '/admin/settings',
        title: 'go to settings page',
        name: 'Settings',
        Icon: <Settings2 width={18} />,
      },
      {
        href: '/admin/help',
        title: 'go to help page',
        name: 'Help',
        Icon: <HelpCircle width={18} />,
      },
      {
        href: '/privacy-policy',
        title: 'go to privacy policy page',
        name: 'Privacy policie',
        Icon: <Info width={18} />,
      },
    ],
  },
}

export const NavLinks = ({onClick}: NavLinksProps) => {
  const pathName = usePathname()

  const isCurrentPage = (currentPage: string) => pathName == currentPage

  const handleOnClick = (
    event: MouseEvent<HTMLAnchorElement>,
    page: NavLink,
  ) => {
    if (page.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    onClick?.()
  }

  return (
    <div className='w-full'>
      {Object.keys(navbarItems).map(section => {
        return (
          <div key={section} className='mb-5 w-full'>
            <p className='text-md mb-3 font-semibold text-base-content/70 '>
              {navbarItems[section].label}
            </p>
            <div className='flex flex-col gap-2'>
              {navbarItems[section].links.map(page => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={event => handleOnClick(event, page)}
                  title={page.title}
                  className={merge([
                    'text-md flex flex-row items-center gap-3 rounded-md px-3 py-2 font-normal hover:text-neutral-content',
                    isCurrentPage(page.href) &&
                      'bg-neutral text-neutral-content',
                    !isCurrentPage(page.href) && 'hover:bg-neutral/50',
                    page.disabled && 'hidden',
                  ])}>
                  {page.Icon}
                  <p>{page.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

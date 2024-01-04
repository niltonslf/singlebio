'use client'

import {
  BarChartHorizontalBig,
  Home,
  LayoutDashboard,
  Lock,
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
        href: '/admin',
        title: 'go to home page',
        name: 'Home',
        Icon: <Home width={18} />,
      },
      {
        href: '/admin/appearance',
        title: 'go to appearance page',
        name: 'Appearance',
        Icon: <Palette width={18} />,
      },
      {
        href: '/admin/analytics',
        title: 'go to analytics page',
        name: 'Analytics',
        Icon: <BarChartHorizontalBig width={18} />,
        disabled: true,
      },
      {
        href: '/admin/settings',
        title: 'go to settings page',
        name: 'Settings',
        Icon: <Settings2 width={18} />,
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
    ],
  },
  support: {
    label: 'Support',
    links: [
      {
        href: '/admin/my-plan',
        title: 'go to plan page',
        name: 'My subscription',
        Icon: <LayoutDashboard width={18} />,
        disabled: true,
      },
      {
        href: '/admin/privacy',
        title: 'go to plan page',
        name: 'Privacy policies',
        Icon: <Lock width={18} />,
        disabled: true,
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
            <p className='text-md mb-3 font-semibold text-neutral-200'>
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
                    'text-md flex flex-row items-center gap-3 rounded-md px-3 py-2 font-normal text-neutral-200 hover:text-neutral-50',
                    isCurrentPage(page.href) && 'bg-primary text-neutral-50',
                    !isCurrentPage(page.href) && 'hover:bg-neutral',
                    page.disabled &&
                      'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-neutral-200',
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

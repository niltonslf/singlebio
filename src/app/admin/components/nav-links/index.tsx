'use client'

import clsx from 'clsx'
import {
  BarChartHorizontalBig,
  Info,
  LayoutDashboard,
  Link2,
  LinkIcon,
  LogOut,
  MessagesSquare,
  Paintbrush,
  Palette,
  Settings2,
  User2,
} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Link from 'next/link'
import {MouseEvent, ReactNode} from 'react'

import {NavLink} from '@/app/admin/components/nav-links/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {authStore} from '@/app/auth/context/auth-store'
import {displayUrlShort, merge, parseUserPageUrl} from '@/utils'

export type NavLink = {
  href: string
  onClick?: () => void
  title: string
  name: string
  Icon: ReactNode
  disabled?: boolean
  textColor?: string
}

type NavSection = {
  label: string
  links: NavLink[]
}

type NavbarLinks = Record<string, NavSection>

type NavLinksProps = {
  onClick?: () => void
  isOpen: boolean
}

export const NavLinks = observer(({onClick, isOpen}: NavLinksProps) => {
  const navbarItems: NavbarLinks = {
    app: {
      label: 'App',
      links: [
        {
          href: '/admin',
          title: 'go to home page',
          name: 'Links',
          Icon: <Link2 width={18} />,
        },
        {
          href: '/admin/profile',
          title: 'go to register page',
          name: 'Profile',
          Icon: <User2 width={18} />,
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
      ],
    },
    soon: {
      label: 'Soon',
      links: [
        {
          href: '/admin/analytics',
          title: 'go to analytics page',
          name: 'Analytics',
          Icon: <BarChartHorizontalBig width={18} />,
          disabled: true,
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
  }

  const settings: NavLink[] = [
    {
      href: '/admin/help',
      title: 'go to help page',
      name: 'Help',
      Icon: <MessagesSquare width={18} />,
    },
    {
      href: '/privacy-policy',
      title: 'go to privacy policy page',
      name: 'Privacy policy',
      Icon: <Info width={18} />,
    },
    {
      href: '/admin/settings',
      title: 'go to settings page',
      name: 'Settings',
      Icon: <Settings2 width={18} />,
    },
    {
      href: '',
      onClick: authStore.logout,
      title: 'logout',
      name: 'Logout',
      Icon: <LogOut width={18} />,
      textColor: 'text-primary',
    },
  ]

  const handleOnClick = (
    event: MouseEvent<HTMLAnchorElement>,
    page: NavLink,
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
    <div className='flex h-full w-full flex-col gap-3 md:w-[210px]'>
      {Object.keys(navbarItems).map(section => {
        return (
          <div key={section} className={clsx(['w-full'])}>
            <p
              className={clsx([
                'mb-2 text-xs font-light text-base-content/70 ',
                !isOpen && 'md:hidden',
              ])}>
              {navbarItems[section].label}
            </p>
            <div className='flex flex-col gap-1'>
              {navbarItems[section].links.map(page => (
                <>
                  <NavLink page={page} className='hidden md:flex'>
                    {page.Icon}
                    <p className={merge([!isOpen && 'md:opacity-0'])}>
                      {page.name}
                    </p>
                  </NavLink>

                  <NavLink
                    page={page}
                    className='md:hidden'
                    onClick={handleOnClick}>
                    {page.Icon}
                    <p>{page.name}</p>
                  </NavLink>
                </>
              ))}
            </div>
          </div>
        )
      })}

      <div className='mt-auto '>
        {adminStore?.user?.username && (
          <Link
            href={parseUserPageUrl(adminStore.user.username)}
            target='_blank'
            className={merge([
              'font-base btn btn-outline mb-3 w-full bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 px-3 font-light',
              !isOpen && 'w-9 p-0',
            ])}>
            <span className={merge([!isOpen && 'hidden'])}>
              {displayUrlShort(adminStore?.user?.username)}
            </span>
            <LinkIcon size={18} />
          </Link>
        )}
      </div>

      <div
        className={merge([
          'flex flex-col gap-1 border-t border-t-base-content/25 pt-3',
          !isOpen && 'border-t-0',
        ])}>
        {settings.map(page => (
          <>
            <NavLink page={page} className='hidden md:flex'>
              {page.Icon}
              <p className={merge([!isOpen && 'md:opacity-0'])}>{page.name}</p>
            </NavLink>

            <NavLink page={page} className='md:hidden' onClick={handleOnClick}>
              {page.Icon}
              <p>{page.name}</p>
            </NavLink>
          </>
        ))}
      </div>
    </div>
  )
})

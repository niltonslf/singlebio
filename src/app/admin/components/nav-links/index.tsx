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
import {ReactNode} from 'react'

import {merge} from '@/utils'

type Page = {
  href: string
  title: string
  name: string
  Icon: ReactNode
}

const pages: Page[] = [
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
  },
  {
    href: '/admin/settings',
    title: 'go to settings page',
    name: 'Settings',
    Icon: <Settings2 width={18} />,
  },
]

const accountPages: Page[] = [
  {
    href: '/admin/register',
    title: 'go to register page',
    name: 'My account',
    Icon: <User2 width={18} />,
  },
]
const supportPages: Page[] = [
  {
    href: '/admin/my-plan',
    title: 'go to plan page',
    name: 'My subscription',
    Icon: <LayoutDashboard width={18} />,
  },
  {
    href: '/admin/privacy',
    title: 'go to plan page',
    name: 'Privacy policies',
    Icon: <Lock width={18} />,
  },
]
export const NavLinks = () => {
  const pathName = usePathname()

  const isCurrentPage = (currentPage: string) => pathName == currentPage

  return (
    <>
      <div>
        <p className='text-md mb-3 font-semibold text-slate-300'>App</p>
        <div className='flex flex-col gap-4'>
          {pages.map(page => (
            <Link
              key={page.href}
              href={page.href}
              title={page.title}
              className={merge([
                'text-md flex flex-row items-center gap-3 rounded-xl px-3 py-2 font-normal text-slate-300 hover:text-bw-1000',
                isCurrentPage(page.href) && 'bg-primary-500  text-bw-1000',
                !isCurrentPage(page.href) && 'hover:bg-background-300',
              ])}>
              {page.Icon}
              <p>{page.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-5'>
        <p className='text-md mb-3 font-semibold text-slate-300'>Personal</p>
        <div className='flex flex-col gap-4'>
          {accountPages.map(page => (
            <Link
              key={page.href}
              href={page.href}
              title={page.title}
              className={merge([
                'text-md flex flex-row items-center gap-3 rounded-xl px-3 py-2 font-normal text-slate-300 hover:text-bw-1000',
                isCurrentPage(page.href) && 'bg-primary-200  text-bw-1000',
              ])}>
              {page.Icon}
              <p>{page.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-5'>
        <p className='text-md mb-3 font-semibold text-slate-300'>Support</p>
        <div className='flex flex-col gap-4'>
          {supportPages.map(page => (
            <Link
              key={page.href}
              href={page.href}
              title={page.title}
              className={merge([
                'text-md flex flex-row items-center gap-3 rounded-xl px-3 py-2 font-normal text-slate-300 hover:text-bw-1000',
                isCurrentPage(page.href) && 'bg-primary-200  text-bw-1000',
              ])}>
              {page.Icon}
              <p>{page.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

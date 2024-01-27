'use client'

import {ExternalLink} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Link from 'next/link'

import {adminStore} from '@/app/admin/context/admin-store'
import {displayUrlShort, parseUserPageUrl} from '@/utils'

export const Header = observer(() => {
  const {user} = adminStore

  const handleCopyLink = () => {
    navigator.clipboard.writeText(parseUserPageUrl(user?.username ?? ''))
  }

  return (
    <div className='flex flex-row items-center gap-5'>
      {user?.username && (
        <div className='flex flex-row items-center gap-5'>
          <Link
            className='flex flex-row items-center gap-1 font-normal text-primary '
            target='_blank'
            href={parseUserPageUrl(user.username)}>
            {adminStore?.user?.username && (
              <span className='hidden md:inline-block'>
                {displayUrlShort(adminStore?.user?.username)}
              </span>
            )}

            <span className='inline-block md:hidden'>@{user?.username}</span>
            <ExternalLink size={15} />
          </Link>
          <button
            className='btn btn-outline btn-sm font-light'
            onClick={() => handleCopyLink()}>
            Copy link
          </button>
        </div>
      )}
    </div>
  )
})

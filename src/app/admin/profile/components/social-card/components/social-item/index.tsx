import {Trash} from 'lucide-react'
import Link from 'next/link'
import {SocialIcon} from 'react-social-icons'

import {socialOptions} from '@/data/social-options'
import {displayUrlShort, parseExternalUrl} from '@/utils'

type SocialItemProps = {
  social: {
    social: string
    url: string
  }
}

export const SocialItem = ({social}: SocialItemProps) => {
  return (
    <div className='flex w-full flex-col flex-nowrap items-start justify-between gap-2 overflow-hidden rounded-lg bg-background-100 px-4 py-2 md:flex-row md:items-center'>
      <span className='flex flex-row flex-wrap items-center justify-between gap-2 text-sm md:text-base'>
        <SocialIcon
          url={social?.url}
          className='!h-8 !w-8'
          as='span'
          fgColor='white'
          bgColor='transparent'
        />
        <span className='text-slate-300'>
          {socialOptions[social?.social]?.label ?? social?.social}
        </span>
      </span>

      <div className='flex w-full flex-row items-center justify-between gap-3 md:w-[65%]  md:justify-end'>
        <p className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left font-normal md:text-right '>
          <Link
            href={parseExternalUrl(social.url)}
            title={social.social}
            className='text-blue-400'>
            {displayUrlShort(social.url, true)}
          </Link>
        </p>
        <button className='rounded-md p-2 text-background-900 hover:bg-primary-500'>
          <Trash size={18} />
        </button>
      </div>
    </div>
  )
}

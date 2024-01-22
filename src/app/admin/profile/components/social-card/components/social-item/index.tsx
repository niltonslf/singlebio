import {Trash} from 'lucide-react'
import Link from 'next/link'
import {SocialIcon} from 'react-social-icons'

import {socialOptions} from '@/constants/social-options'
import {SocialPage} from '@/domain/models'
import {displayUrlShort, parseExternalUrl} from '@/utils'

type SocialItemProps = {
  social: SocialPage
  onDelete: (socialName: string) => Promise<void>
}

export const SocialItem = ({social, onDelete}: SocialItemProps) => {
  return (
    <div className='flex w-full flex-col flex-nowrap items-start justify-between gap-2 overflow-hidden rounded-lg bg-base-100 px-4 py-2 md:flex-row md:items-center'>
      <span className='flex flex-row flex-wrap items-center justify-between gap-2 text-sm md:text-base'>
        <SocialIcon
          url={social?.url}
          className='!h-8 !w-8'
          as='span'
          network={social?.name}
        />
        <span className='text-base-content/70'>
          {socialOptions[social?.name]?.label ?? social?.name}
        </span>
      </span>

      <div className='flex w-full flex-row items-center justify-between gap-3 md:w-[65%]  md:justify-end'>
        <p className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-left font-normal md:text-right '>
          <Link
            href={parseExternalUrl(social.url)}
            target='_blank'
            title={social.name}
            className='text-info'>
            {displayUrlShort(social.url, true)}
          </Link>
        </p>
        <button
          className='btn btn-square btn-xs hover:btn-primary'
          onClick={() => onDelete(social.id)}>
          <Trash size={18} />
        </button>
      </div>
    </div>
  )
}

import {Trash} from 'lucide-react'

import {socialOptions} from '@/data/social-options'

type SocialItemProps = {
  social: {
    social: string
    url: string
  }
}

export const SocialItem = ({social}: SocialItemProps) => {
  return (
    <div className='flex flex-row flex-wrap  gap-5'>
      <div className='flex flex-1 flex-col gap-3'>
        <div className='flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg bg-background-100 px-4 py-2'>
          <span className='flex flex-row flex-wrap items-center justify-between gap-5'>
            {socialOptions[social?.social]?.icon}
            <span>
              {socialOptions[social?.social]?.label ?? social?.social}
            </span>
          </span>
          <div className='flex flex-row items-center gap-3'>
            <p className='text-right font-normal'>{social.url}</p>
            <button className='rounded-md p-2 text-background-900 hover:bg-primary-500'>
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

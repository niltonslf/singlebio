import {Trash} from 'lucide-react'
import {ReactNode} from 'react'

import {Link} from '@/models'

type LinkCardItemProps = {
  link: Link
  onDelete: (link: Link) => void
  children: ReactNode
}

export const LinkCardItem = ({link, onDelete, children}: LinkCardItemProps) => {
  return (
    <li
      key={link.id}
      className='flex w-full flex-wrap items-center justify-center gap-4 rounded-lg bg-gray-700 p-3 font-medium md:p-5'>
      <div className='flex flex-1 flex-col items-center gap-2'>{children}</div>
      <div onClick={() => onDelete(link)} className='cursor-pointer'>
        <Trash className='text-red-400 hover:text-red-700' />
      </div>
    </li>
  )
}

import {Grip, Trash} from 'lucide-react'
import {ReactNode} from 'react'

import {Link} from '@/models'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

type LinkCardItemProps = {
  link: Required<Link>
  onDelete: (link: Link) => void
  children: ReactNode
}

export const LinkCardItem = ({link, onDelete, children}: LinkCardItemProps) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: link.id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      key={link.id}
      ref={setNodeRef}
      style={style}
      className='flex w-full flex-wrap items-center justify-center gap-4 rounded-lg bg-gray-700 p-3 font-medium md:p-5'>
      <div className='flex w-10 flex-col items-center rounded-lg  '>
        <span {...attributes} {...listeners}>
          <Grip width={30} height={30} color='white' />
        </span>
      </div>
      <div className='flex flex-1 flex-col items-center gap-2'>{children}</div>
      <div onClick={() => onDelete(link)} className='cursor-pointer'>
        <Trash className='text-red-400 hover:text-red-700' />
      </div>
    </li>
  )
}

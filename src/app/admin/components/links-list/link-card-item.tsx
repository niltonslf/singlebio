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
      ref={setNodeRef}
      style={style}
      className='flex w-full flex-wrap items-center justify-center gap-3 rounded-lg bg-[#1b1b22] p-2  font-medium shadow-md md:p-5'>
      <button
        className=' mr-3 flex touch-none flex-col items-center'
        {...attributes}
        {...listeners}>
        <span>
          <Grip width={20} height={20} color='white' />
        </span>
      </button>

      <div className='flex flex-1 flex-col items-center gap-2'>{children}</div>

      <div className='flex h-full items-end '>
        <div
          onClick={() => onDelete(link)}
          className='cursor-pointer'
          data-testid='delete-link-btn'>
          <Trash
            width={20}
            height={20}
            className='text-[#b50048] hover:text-[#8d006f]'
          />
        </div>
      </div>
    </li>
  )
}

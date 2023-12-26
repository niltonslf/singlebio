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
      className='flex w-full flex-wrap items-center justify-center gap-3 rounded-xl bg-background-300 px-3 py-2  font-medium shadow-md md:px-5 md:py-3'>
      <button
        className=' mr-3 flex touch-none flex-col items-center'
        {...attributes}
        {...listeners}>
        <span>
          <Grip width={20} height={20} className='text-slate-300' />
        </span>
      </button>

      <div className='flex flex-1 flex-col items-center gap-2'>{children}</div>

      <div
        onClick={() => onDelete(link)}
        className='cursor-pointer'
        data-testid='delete-link-btn'>
        <Trash
          width={20}
          height={20}
          className='text-slate-300 hover:text-bw-800'
        />
      </div>
    </li>
  )
}

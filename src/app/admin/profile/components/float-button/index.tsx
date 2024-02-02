import {Camera, Trash2} from 'lucide-react'

import {merge} from '@/utils'

type FloatButtonProps = {
  onClick: () => void
  active: boolean
}

export const FloatButton = ({onClick, active = false}: FloatButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={merge([
        'flex h-9 w-9 items-center justify-center rounded-full',
        'absolute right-0 top-0 cursor-pointer shadow-md shadow-black/50',
        'group bg-neutral-950',
        'hover:bg-neutral-200',
        'md:right-1 md:top-1',
      ])}>
      {active ? (
        <Trash2
          size={18}
          className='text-base-content group-hover:text-neutral-950'
        />
      ) : (
        <Camera
          size={18}
          className='text-base-content group-hover:text-neutral-950'
        />
      )}
    </div>
  )
}

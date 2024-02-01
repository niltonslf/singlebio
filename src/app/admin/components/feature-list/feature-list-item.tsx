import {LucideIcon, Plus} from 'lucide-react'
import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

type FeatureListItemProps = {
  Icon: LucideIcon
  iconClass?: HTMLAttributes<HTMLElement>['className']
  onClick?: () => void
  children?: ReactNode
}

export const FeatureListItem = ({
  children,
  Icon,
  iconClass,
  onClick,
}: FeatureListItemProps) => {
  return (
    <label
      onClick={onClick}
      className={merge([
        'color flex w-full justify-between bg-base-300 px-5 py-4 ',
        'items-center gap-3 rounded-xl',
      ])}>
      <div className={merge(['rounded-md bg-gray-600 p-2', iconClass])}>
        <Icon size={15} />
      </div>

      <div className='text-md w-full font-semibold text-base-content'>
        {children}
      </div>

      <button className='btn btn-square btn-ghost btn-sm'>
        <Plus className='icon-up text-base-content' />
      </button>
    </label>
  )
}

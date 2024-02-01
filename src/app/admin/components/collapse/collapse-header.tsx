'use client'

import {ChevronDownIcon, ChevronUpIcon, LucideIcon} from 'lucide-react'
import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

import {useCollapse} from './context/collapse-context'
import {useCollapseItem} from './context/collapse-item-context'

type CollapseHeaderProps = {
  children?: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
  Icon?: LucideIcon
  iconClass?: HTMLAttributes<HTMLElement>['className']
}

export const CollapseHeader = ({
  children,
  className,
  Icon,
  iconClass,
}: CollapseHeaderProps) => {
  const {isItemOpen, handleToggleItem, onClose, onOpen} = useCollapse()
  const {itemIndex} = useCollapseItem()

  const handleClick = () => {
    handleToggleItem(itemIndex)

    if (!isItemOpen(itemIndex)) return onOpen?.(itemIndex)
    return onClose?.(itemIndex)
  }

  return (
    <header className='flex w-full select-none' onClick={() => handleClick()}>
      <label
        className={merge([
          'color flex w-full cursor-pointer items-center justify-between gap-3 bg-base-300 px-5 py-4 ',
          className,
        ])}>
        {Icon && (
          <div className={merge(['rounded-md bg-gray-600 p-2', iconClass])}>
            <Icon size={15} />
          </div>
        )}

        <div className='text-md w-full font-semibold text-base-content'>
          {children}
        </div>
        {isItemOpen(itemIndex) ? (
          <ChevronUpIcon className='icon-up text-base-content' />
        ) : (
          <ChevronDownIcon className='icon-down text-base-content' />
        )}
      </label>
    </header>
  )
}

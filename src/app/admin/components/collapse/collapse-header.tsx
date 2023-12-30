'use client'

import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

import {useCollapse} from './context/collapse-context'
import {useCollapseItem} from './context/collapse-item-context'

type CollapseHeaderProps = {
  children?: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export const CollapseHeader = ({children, className}: CollapseHeaderProps) => {
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
          'color flex w-full cursor-pointer justify-between bg-neutral px-5 py-4 ',
          className,
        ])}>
        <div className='text-md w-full font-semibold text-neutral-200'>
          {children}
        </div>
        {isItemOpen(itemIndex) ? (
          <ChevronUpIcon className='icon-up text-neutral-200' />
        ) : (
          <ChevronDownIcon className='icon-down text-neutral-200' />
        )}
      </label>
    </header>
  )
}

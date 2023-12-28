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
          'color flex w-full cursor-pointer justify-between bg-background-300 p-3',
          className,
        ])}>
        <div className='w-full text-slate-300'>{children}</div>
        {isItemOpen(itemIndex) ? (
          <ChevronUpIcon className='icon-up text-slate-300' />
        ) : (
          <ChevronDownIcon className='icon-down text-slate-300' />
        )}
      </label>
    </header>
  )
}

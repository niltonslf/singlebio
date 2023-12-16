import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {ReactNode} from 'react'

import {useCollapse} from './context/collapse-context'
import {useCollapseItem} from './context/collapse-item-context'

type CollapseHeaderProps = {
  children?: ReactNode
}

export const CollapseHeader = ({children}: CollapseHeaderProps) => {
  const {isItemOpen, handleToggleItem, onClose, onOpen} = useCollapse()
  const {itemIndex} = useCollapseItem()

  const handleClick = () => {
    handleToggleItem(itemIndex)
    if (!isItemOpen(itemIndex) && onOpen) return onOpen(itemIndex)
    if (isItemOpen(itemIndex) && onClose) return onClose(itemIndex)
  }

  return (
    <header className='flex w-full select-none' onClick={() => handleClick()}>
      <label className='color flex w-full cursor-pointer justify-between bg-white p-3'>
        <div className='w-full '>{children}</div>
        {isItemOpen(itemIndex) ? (
          <ChevronUpIcon className='icon-up' />
        ) : (
          <ChevronDownIcon className='icon-down' />
        )}
      </label>
    </header>
  )
}

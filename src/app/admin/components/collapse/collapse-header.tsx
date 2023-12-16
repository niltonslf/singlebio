import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {PropsWithChildren} from 'react'

import {useCollapse} from './context/collapse-context'

type CollapseHeaderProps = PropsWithChildren

export const CollapseHeader = ({children}: CollapseHeaderProps) => {
  const {isOpen, setIsOpen, onClose, onOpen} = useCollapse()

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (isOpen && onOpen) return onOpen(1)
    if (!isOpen && onClose) return onClose(1)
  }

  return (
    <header className='flex w-full select-none' onClick={() => handleClick()}>
      <label className='color flex w-full cursor-pointer justify-between bg-white p-3'>
        <div className='w-full '>{children}</div>
        {isOpen ? (
          <ChevronUpIcon className='icon-up' />
        ) : (
          <ChevronDownIcon className='icon-down' />
        )}
      </label>
    </header>
  )
}

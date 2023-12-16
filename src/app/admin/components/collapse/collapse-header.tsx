import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {ReactNode} from 'react'

type CollapseHeaderProps = {
  children?: ReactNode | string
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const CollapseHeader = ({
  children,
  isOpen,
  onClose,
  onOpen,
}: CollapseHeaderProps) => {
  return (
    <header
      className='flex w-full  select-none bg-orange-400'
      onClick={() => (isOpen ? onClose?.() : onOpen?.())}>
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

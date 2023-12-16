import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {ReactNode} from 'react'

type CollapseHeaderProps = {
  children: ReactNode
}

export const CollapseHeader = ({children}: CollapseHeaderProps) => {
  return (
    <header className='relative w-full'>
      <input
        type='checkbox'
        id='toggle'
        className='reset absolute inset-0 z-10 cursor-pointer outline-0'
      />
      <label
        htmlFor='toggle'
        className='color flex justify-between bg-white p-3'>
        <div className='w-full'>{children}</div>
        <ChevronDownIcon className='icon-down' />
        <ChevronUpIcon className='icon-up hidden' />
      </label>
    </header>
  )
}

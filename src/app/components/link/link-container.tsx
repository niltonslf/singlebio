import {ReactNode} from 'react'

type LinkContainerProps = {
  children: ReactNode
}

export const LinkContainer = ({children}: LinkContainerProps) => {
  return (
    <ul
      aria-label='link-list'
      className='flex w-full flex-col gap-5 overflow-y-auto px-0 py-3 md:p-10'>
      {children}
    </ul>
  )
}

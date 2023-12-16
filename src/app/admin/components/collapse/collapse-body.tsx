import clsx from 'clsx'
import {ReactNode} from 'react'

type CollapseBodyProps = {
  children?: ReactNode
  isOpen?: boolean
}

export const CollapseBody = ({children, isOpen}: CollapseBodyProps) => {
  return (
    <div
      className={clsx(
        'grid grid-rows-[0fr] transition-[grid-template-rows] ease-in-out',
        isOpen && 'grid-rows-[1fr]',
      )}>
      <div className='box-border overflow-hidden'>
        <div className='p-3'>{children}</div>
      </div>
    </div>
  )
}

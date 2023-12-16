import clsx from 'clsx'
import {PropsWithChildren} from 'react'

import {useCollapse} from './context/collapse-context'

type CollapseBodyProps = PropsWithChildren

export const CollapseBody = ({children}: CollapseBodyProps) => {
  const {isOpen} = useCollapse()

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

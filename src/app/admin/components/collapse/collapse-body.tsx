import {ReactNode} from 'react'

type CollapseBodyProps = {
  children: ReactNode
}

export const CollapseBody = ({children}: CollapseBodyProps) => {
  return (
    <div
      className='grid grid-rows-[0fr] 
            transition-[grid-template-rows]
            ease-in-out
            '>
      <div className='box-border overflow-hidden'>
        <div className='p-3'>{children}</div>
      </div>
    </div>
  )
}

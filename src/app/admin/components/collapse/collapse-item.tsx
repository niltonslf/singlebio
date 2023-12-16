import {ReactNode} from 'react'

type CollapseItemProps = {
  children: ReactNode
}

export const CollapseItem = ({children}: CollapseItemProps) => {
  return (
    <article className='mb-3 h-min overflow-hidden rounded-md border bg-gray-200'>
      {children}
    </article>
  )
}

import {ReactNode} from 'react'

import {CollapseBody} from './collapse-body'
import {CollapseHeader} from './collapse-header'

type CollapseProps = {
  children: ReactNode
  startOpen?: boolean
}

export const Collapse = ({children, startOpen}: CollapseProps) => {
  return (
    <article
      className=' mb-3 h-min overflow-hidden
          rounded-md 
          border 
          bg-gray-200
          [&:has(input:checked)>div]:grid-rows-[1fr]
          [&:has(input:checked)_header_.icon-down]:hidden
          [&:has(input:checked)_header_.icon-up]:block
        '>
      {children}
    </article>
  )
}

Collapse.header = CollapseHeader
Collapse.body = CollapseBody

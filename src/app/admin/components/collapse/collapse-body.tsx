'use client'

import {PropsWithChildren, memo} from 'react'

import {merge} from '@/utils'

import {useCollapse} from './context/collapse-context'
import {useCollapseItem} from './context/collapse-item-context'

type CollapseBodyProps = PropsWithChildren

export const CollapseBody = memo(({children}: CollapseBodyProps) => {
  const {isItemOpen} = useCollapse()
  const {itemIndex} = useCollapseItem()

  const isOpen = isItemOpen(itemIndex)

  return (
    <div
      className={merge(
        'grid grid-rows-[0fr] transition-[grid-template-rows] ease-in-out',
        isOpen && 'grid-rows-[1fr]',
      )}>
      <div className='box-border overflow-hidden'>
        <div className='p-3'>{children}</div>
      </div>
    </div>
  )
})

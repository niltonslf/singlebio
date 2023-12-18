import {HTMLAttributes, ReactNode, useEffect} from 'react'

import {merge} from '@/utils'

import {useCollapse} from './context/collapse-context'
import {CollapseItemProvider} from './context/collapse-item-context'

type CollapseItemProps = {
  children: ReactNode
  index: number
  className?: HTMLAttributes<HTMLElement>['className']
}

export const CollapseItem = ({
  children,
  index,
  className,
}: CollapseItemProps) => {
  const {setItemIndex} = useCollapse()

  useEffect(() => {
    setItemIndex(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CollapseItemProvider index={index}>
      <article
        className={merge([
          'mb-3 h-min overflow-hidden rounded-md border bg-gray-200',
          className,
        ])}>
        {children}
      </article>
    </CollapseItemProvider>
  )
}

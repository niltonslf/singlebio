import {ReactNode, useEffect} from 'react'

import {useCollapse} from './context/collapse-context'
import {CollapseItemProvider} from './context/collapse-item-context'

type CollapseItemProps = {
  children: ReactNode
  index: number
}

export const CollapseItem = ({children, index}: CollapseItemProps) => {
  const {setItemIndex} = useCollapse()

  useEffect(() => {
    setItemIndex(index)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CollapseItemProvider index={index}>
      <article className='mb-3 h-min overflow-hidden rounded-md border bg-gray-200'>
        {children}
      </article>
    </CollapseItemProvider>
  )
}

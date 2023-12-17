import {ReactNode} from 'react'

import {CollapseBody} from './collapse-body'
import {CollapseHeader} from './collapse-header'
import {CollapseItem} from './collapse-item'
import {CollapseProvider} from './context/collapse-context'

type CollapseProps = {
  children: ReactNode
  defaultOpen?: number
  onOpen?: (index: number) => void
  onClose?: (index: number) => void
}

export const Collapse = ({
  children,
  defaultOpen,
  onClose,
  onOpen,
}: CollapseProps) => {
  return (
    <CollapseProvider
      defaultOpen={defaultOpen}
      onClose={onClose}
      onOpen={onOpen}>
      {children}
    </CollapseProvider>
  )
}

Collapse.Item = CollapseItem
Collapse.Header = CollapseHeader
Collapse.Body = CollapseBody

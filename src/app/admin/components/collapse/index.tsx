import {ReactNode} from 'react'

import {CollapseBody} from './collapse-body'
import {CollapseHeader} from './collapse-header'
import {CollapseItem} from './collapse-item'
import {CollapseProvider} from './context/collapse-context'

type CollapseProps = {
  children: ReactNode
  isOpen: boolean
  onOpen?: (index: number) => void
  onClose?: (index: number) => void
}

export const Collapse = ({
  children,
  isOpen,
  onClose,
  onOpen,
}: CollapseProps) => {
  return (
    <CollapseProvider defaultOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      {children}
    </CollapseProvider>
  )
}

Collapse.Item = CollapseItem
Collapse.Header = CollapseHeader
Collapse.Body = CollapseBody

import {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react'

import {CollapseBody} from './collapse-body'
import {CollapseHeader} from './collapse-header'

type CollapseProps = {
  children: ReactNode
  startOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}
export const Collapse = ({
  children,
  startOpen,
  onOpen,
  onClose,
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
    if (onOpen) {
      onOpen()
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    if (startOpen !== undefined) setIsOpen(startOpen)
  }, [startOpen])

  return (
    <article className='mb-3 h-min overflow-hidden rounded-md border bg-gray-200'>
      {Children.map(children, child => {
        if (isValidElement(child)) {
          if (child.type === CollapseHeader) {
            return cloneElement(child, {
              ...child.props,
              isOpen: isOpen,
              onOpen: handleOpen,
              onClose: handleClose,
            })
          }
          if (child.type === CollapseBody) {
            return cloneElement(child, {...child.props, isOpen})
          }
        }
        return 'error'
      })}
    </article>
  )
}

Collapse.header = CollapseHeader
Collapse.body = CollapseBody

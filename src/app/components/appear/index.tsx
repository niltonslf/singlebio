'use client'

import {ReactNode, useEffect, useState} from 'react'

import {merge} from '@/utils'

type AppearProps = {
  children: ReactNode
  isOpen: boolean
  onClose?: () => void
  delay?: number
}

export const Appear = ({
  children,
  isOpen,
  onClose,
  delay = 5000,
}: AppearProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, delay)
    }
  }, [delay, isOpen, onClose])

  return (
    <div
      className={merge([
        'grid grid-rows-[0fr] transition-[grid-template-rows] ease-in-out',
        isVisible && 'grid-rows-[1fr]',
      ])}>
      <div className='box-border overflow-hidden'>{children}</div>
    </div>
  )
}

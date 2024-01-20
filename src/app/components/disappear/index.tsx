'use client'

import {ReactNode, useEffect, useState} from 'react'

import {merge} from '@/utils'

type DisappearProps = {
  children: ReactNode
  isClosed: boolean
  onOpen?: () => void
  delay?: number
}

export const Disappear = ({
  children,
  isClosed,
  onOpen,
  delay = 5000,
}: DisappearProps) => {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (isClosed) {
      setIsHidden(true)
      setTimeout(() => {
        setIsHidden(false)
        onOpen?.()
      }, delay)
    }
  }, [delay, isClosed, onOpen])

  return (
    <div
      className={merge([
        'grid  grid-rows-[1fr] transition-[grid-template-rows] ease-in-out',
        isHidden && 'grid-rows-[0fr]',
      ])}>
      <div className='box-border overflow-hidden'>{children}</div>
    </div>
  )
}

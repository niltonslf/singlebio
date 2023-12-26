'use client'

import {Loader2} from 'lucide-react'
import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

export type ButtonVariants = 'primary' | 'error' | 'warning' | 'success'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  className?: HTMLAttributes<HTMLButtonElement>['className']
  variant?: ButtonVariants
  isLoading?: boolean
}

export const Button = ({
  children,
  className,
  onClick,
  variant = 'primary',
  isLoading,
}: ButtonProps) => {
  return (
    <button
      className={merge([`btn btn-${variant}`, className])}
      onClick={onClick}>
      {isLoading ? (
        <span className='flex flex-row items-center justify-between gap-2'>
          <Loader2 className='animate-spin' />
        </span>
      ) : (
        children
      )}
    </button>
  )
}

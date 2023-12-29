import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

type ContentLayoutProps = {
  children?: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export const AdminLayoutContent = ({
  children,
  className,
}: ContentLayoutProps) => {
  return (
    <section
      className={merge(['flex h-full w-full flex-col pb-12 pt-6', className])}>
      {children}
    </section>
  )
}

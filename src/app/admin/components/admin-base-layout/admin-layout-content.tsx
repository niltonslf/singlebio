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
      className={merge(['flex h-full flex-[2] flex-col py-10', className])}>
      {children}
    </section>
  )
}

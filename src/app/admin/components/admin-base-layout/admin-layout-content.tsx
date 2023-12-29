import {ReactNode} from 'react'

type ContentLayoutProps = {
  children?: ReactNode
}

export const AdminLayoutContent = ({children}: ContentLayoutProps) => {
  return (
    <section className='flex h-full w-full flex-col pb-12 pt-6'>
      {children}
    </section>
  )
}

import {ReactNode} from 'react'

type ContentLayoutProps = {
  children?: ReactNode
}

export const ContentLayout = ({children}: ContentLayoutProps) => {
  return (
    <section className='flex h-auto  flex-col rounded-lg bg-gray-800 p-4 md:p-10'>
      {children}
    </section>
  )
}

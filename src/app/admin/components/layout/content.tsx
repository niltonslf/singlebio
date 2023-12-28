import {ReactNode} from 'react'

type ContentLayoutProps = {
  children?: ReactNode
}

export const ContentLayout = ({children}: ContentLayoutProps) => {
  return <section className='flex flex-col pt-8'>{children}</section>
}

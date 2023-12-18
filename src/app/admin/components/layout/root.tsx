import {ReactNode} from 'react'

export type LayoutRootProps = {
  children: ReactNode
}

export const LayoutRoot = ({children}: LayoutRootProps) => {
  return (
    <main className='grid min-h-[calc(100%-80px)] w-full grid-cols-1 gap-3 md:grid-cols-[3fr_1.5fr] md:grid-rows-[1fr]'>
      {children}
    </main>
  )
}

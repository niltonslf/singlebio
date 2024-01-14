import {ReactNode} from 'react'

type SectionCardProps = {
  children: ReactNode
  title: string
}

export const SectionCard = ({children, title}: SectionCardProps) => {
  return (
    <div className='relative flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-base-300 p-6 shadow-lg'>
      <div className='mb-5 flex items-baseline'>
        <h3 className='text-xl font-semibold'>{title}</h3>
      </div>

      <div className='h-full w-full '>{children}</div>
    </div>
  )
}

import {X, Eye} from 'lucide-react'
import {HTMLAttributes, ReactNode, useState} from 'react'

import {merge} from '@/utils'

type SidebarProps = {
  children: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export const AdminLayoutPagePreview = ({children, className}: SidebarProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <>
      <div
        className={merge([
          'flex flex-1 flex-row items-center justify-center ',
          'absolute left-0 top-full z-30 h-[100vh] w-[40%] pt-10 backdrop-blur-md',
          'md:sticky md:top-0 md:h-screen md:p-0 md:backdrop-blur-none',
          'transition-all duration-500',
          isPreviewOpen && 'top-0',
          className,
        ])}>
        {children}
      </div>

      <button
        className='btn btn-neutral btn-md fixed bottom-5 right-5 z-20 md:hidden'
        onClick={() => setIsPreviewOpen(prev => !prev)}>
        {isPreviewOpen ? <X size={18} /> : <Eye size={18} />}
        {!isPreviewOpen && <p>Preview</p>}
      </button>
    </>
  )
}

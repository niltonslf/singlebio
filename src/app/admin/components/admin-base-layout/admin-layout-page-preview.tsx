import {X, Eye} from 'lucide-react'
import {HTMLAttributes, ReactNode, useState} from 'react'

import {merge} from '@/utils'

type SidebarProps = {
  children: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export const AdminLayoutPagePreview = ({children, className}: SidebarProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(true)

  return (
    <>
      <div
        className={merge([
          'flex flex-1 flex-row items-center justify-center ',
          'absolute left-0 top-full z-30 h-[100vh] w-full pt-10 backdrop-blur-md',
          'md:static md:sticky md:top-0 md:h-[calc(100vh-60px)] md:p-0 md:backdrop-blur-none',
          'transition-all duration-500',
          isPreviewOpen && 'top-0',
          className,
        ])}>
        {children}
      </div>

      <button
        className='bw btn solid md fixed bottom-4 right-4 z-50 flex rounded-full shadow-md md:hidden'
        onClick={() => setIsPreviewOpen(prev => !prev)}>
        {isPreviewOpen ? <X size={18} /> : <Eye size={18} />}
        {!isPreviewOpen && <p>Preview</p>}
      </button>
      {/* <div
        className={merge([
          'absolute -bottom-full left-0 z-30 flex h-[100vh] w-full flex-row justify-center bg-transparent px-3 pt-10 backdrop-blur-md',
          'transition-all duration-500 md:hidden',
          showMobilePreview && 'bottom-0',
        ])}>
        <div
          className={merge([
            'aspect-[9/19] h-full w-full overflow-hidden',
            'max-w-[500px] border-[15px] border-b-0 border-[#111]',
            'rounded-tl-[40px] rounded-tr-[40px] bg-background-100',
            ' has-shadow',
          ])}>
          <iframe
            src={parseUserPageUrl(user?.username || '')}
            className='h-full w-full'
          />
        </div>
      </div> */}
    </>
  )
}

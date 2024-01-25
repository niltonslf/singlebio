import {forwardRef} from 'react'

import {merge} from '@/utils'

type SmartphoneProps = {
  iframeUrl?: string
}

export const Smartphone = forwardRef<HTMLIFrameElement, SmartphoneProps>(
  ({iframeUrl}, ref) => {
    return (
      <div
        className={merge([
          'shadow-[0px_0px_30px_0px_rgba(154, 154, 154, 0.1)] rounded-[60px]',
          'max-h-[calc(100vh-90px)] max-w-[calc(100vw-100px)] md:max-h-[100%] md:max-w-[290px] ',
          '-mb-12 h-full w-full md:mb-0 md:h-auto',
        ])}>
        <div
          className='after:content-[" "] before:content-[" "]
        relative 
        box-border 
        flex 
        aspect-[9/19] 
        h-full 
        max-h-[calc(100vh-90px)]
        w-full
        max-w-[calc(100vw-70px)]
        items-center 
        justify-center 
        overflow-hidden
        rounded-bl-[0px]
        rounded-br-[0px]
        rounded-tl-[40px]
        rounded-tr-[40px]
        bg-black
        shadow-[0px_0px_0px_11px_#1f1f1f,0px_0px_0px_13px_#191919,0px_0px_0px_20px_#111111]
        before:absolute 
        before:left-[calc(50%-28%)] 
        before:top-0 
        before:z-50 
        before:h-[30px] 
        before:w-[56%] 
        before:rounded-[0px_0px_40px_40px] 
        before:bg-gradient-to-b
        before:from-[#1f1f1f]
        before:via-[#1f1f1f]
        before:to-[#111]
        after:absolute 
        after:bottom-2 
        after:left-[calc(50%-20%)]
        after:hidden
        after:h-1 
        after:w-[40%] 
        after:rounded-full 
        after:bg-white 
        after:shadow-md  
        md:h-auto
        md:max-h-[100%] 
        md:max-w-[290px]
        md:rounded-bl-[40px]
        md:rounded-br-[40px]
        md:after:block'>
          {iframeUrl ? (
            <iframe
              ref={ref}
              src={iframeUrl}
              className='h-full w-full object-cover'
            />
          ) : (
            <div
              data-testid='smartphone-loader'
              className={merge([
                'flex h-full w-full bg-neutral-50',
                'flex-1 items-center justify-center',
                'w-[290px] max-w-full',
              ])}>
              <div className='loading loading-dots loading-lg text-primary' />
            </div>
          )}
        </div>
      </div>
    )
  },
)

Smartphone.displayName = 'Smartphone'

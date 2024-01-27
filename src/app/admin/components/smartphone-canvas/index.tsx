import {ReactNode} from 'react'

import {merge} from '@/utils'

type SmartphoneCanvasProps = {
  children?: ReactNode
}

export const SmartphoneCanvas = ({children}: SmartphoneCanvasProps) => {
  return (
    <div
      className={merge([
        'shadow-[0px_0px_30px_0px_rgba(154, 154, 154, 0.1)] rounded-[60px]',
        'max-h-[calc(100vh-30px)] max-w-[calc(100vw-110px)] md:max-h-[100%] md:max-w-[350px] ',
        'mb-5 h-full w-full md:mb-0 md:h-auto',
        'pt-5 md:scale-75 md:transform md:pt-0',
      ])}>
      <div
        className='after:content-[" "] before:content-[" "]
        relative 
        box-border 
        flex 
        aspect-[9/19] 
        h-full 
        max-h-[calc(100vh-30px)]
        w-full
        max-w-[calc(100vw-110px)]
        items-center 
        justify-center 
        overflow-hidden
        rounded-bl-[40px]
        rounded-br-[40px]
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
        md:max-w-[350px]
        md:rounded-bl-[40px]
        md:rounded-br-[40px]
        md:after:block'>
        {children}
      </div>
    </div>
  )
}

SmartphoneCanvas.displayName = 'SmartphoneCanvas'

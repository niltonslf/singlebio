import clsx from 'clsx'
import {ReactNode} from 'react'

import {UserTheme} from '@/domain/models'

type WrapperProps = {
  children: ReactNode
  theme?: UserTheme
}

export const Wrapper = ({theme, children}: WrapperProps) => {
  return (
    <main
      data-theme='dark'
      className={clsx([
        'flex h-[100vh] w-full flex-wrap overflow-hidden overflow-y-auto bg-[#f9f9f9]',
      ])}>
      <section
        className={clsx([
          'flex min-h-[100dvh] w-screen flex-col items-center justify-start',
        ])}
        style={{backgroundColor: theme?.backgroundColor}}>
        <div
          className={clsx([
            'relative z-10 h-44 w-full bg-cover bg-center md:h-52 ',
            !theme?.backgroundImage ? 'bg-gray-300' : '',
          ])}
          style={{
            backgroundImage: `url(${theme?.backgroundImage})`,
          }}>
          <div className='h-full w-full backdrop-blur-md'>
            <div
              className='mx-auto h-full w-full max-w-5xl bg-base-300 bg-cover bg-center'
              style={{
                backgroundImage: `url(${theme?.backgroundImage})`,
              }}></div>
          </div>
        </div>

        <div className='-mt-[75px] flex w-full max-w-2xl flex-1 flex-col flex-wrap px-5 pb-8 '>
          {children}
        </div>
      </section>
    </main>
  )
}

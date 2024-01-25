import clsx from 'clsx'
import {ReactNode} from 'react'

import {UserTheme} from '@/domain/models'

type WrapperProps = {
  children: ReactNode
  theme?: UserTheme
}

export const Wrapper = ({theme, children}: WrapperProps) => {
  const defaultBg = 'bg-[#f9f9f9]'

  return (
    <main
      data-theme='dark'
      className={clsx([
        'flex h-[100vh] w-full flex-wrap overflow-y-auto bg-cover bg-center',
        'bg-fixed',
        defaultBg,
      ])}>
      <div
        className='relative z-10 h-44 w-full bg-cover bg-center md:h-52 '
        style={{
          backgroundImage: `url(${theme?.backgroundImage})`,
        }}>
        <div className='w-full backdrop-blur-md'>
          <div
            className='mx-auto h-full w-full max-w-5xl bg-base-300 bg-cover bg-center'
            style={{
              backgroundImage: `url(${theme?.backgroundImage})`,
            }}></div>
        </div>
      </div>
      <section
        className={clsx([
          '-mt-[75px] flex min-h-full w-full flex-col items-center px-5 pb-8',
        ])}
        style={{
          backgroundColor: theme?.backgroundColor,
        }}>
        <div className='flex w-full max-w-2xl flex-1 flex-col flex-wrap'>
          {children}
        </div>
      </section>
    </main>
  )
}

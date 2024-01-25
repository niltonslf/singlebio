import clsx from 'clsx'
import {ReactNode} from 'react'

import {UserTheme} from '@/domain/models'

type WrapperProps = {
  children: ReactNode
  theme?: UserTheme
}

export const Wrapper = ({theme, children}: WrapperProps) => {
  const defaultBg = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

  return (
    <main
      data-theme='dark'
      className={clsx([
        'flex h-[100vh] w-full flex-wrap overflow-hidden bg-cover bg-center',
        'bg-fixed',
      ])}
      style={{
        backgroundImage: `url(${theme?.backgroundImage})`,
      }}>
      <section
        className={clsx([
          'flex h-[100dvh] w-screen flex-col items-center justify-start  overflow-y-auto',
          'px-5 pb-8 pt-20',
          !theme?.backgroundImage ? defaultBg : '',
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

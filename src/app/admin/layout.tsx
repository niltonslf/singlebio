'use client'

import {observer} from 'mobx-react-lite'
import Image from 'next/image'
import {ReactNode} from 'react'

import {merge} from '@/utils'

import {Header, NavLinks} from './components'
import {SmartphoneProvider} from './context/smartphone-context'
import {useValidateAuth} from './hooks'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  useValidateAuth()

  return (
    <SmartphoneProvider>
      <main
        className={merge([
          'flex h-screen  w-screen flex-col items-center',
          ' bg-gradient-to-tr  from-[#111216] from-20%',
          ' via-[#b1092d66] via-45%  to-[#111216] to-70% ',
          ' bg-[#111216]',
        ])}>
        <section className='grid h-screen w-screen grid-cols-[auto_1fr] bg-[#0d0d0eed]'>
          <nav className='flex w-[250px] flex-col gap-5 border-r border-[#262630] p-5 '>
            <span className='mb-8 flex w-full justify-center'>
              <Image
                src='/logo-white.png'
                width={114.72}
                height={30}
                alt='lnktree logo'
              />
            </span>

            <NavLinks />

            <div className='mt-auto w-full text-center text-sm text-[#a1a1a1]'>
              v1.0.1 (beta)
            </div>
          </nav>

          <div className='grid h-screen grid-rows-[56px_1fr] px-10'>
            <Header />
            <section className='h-[calc(100vh-56px)] w-full overflow-y-auto'>
              {children}
            </section>
          </div>
        </section>
      </main>
    </SmartphoneProvider>
  )
})

export default AdminLayout

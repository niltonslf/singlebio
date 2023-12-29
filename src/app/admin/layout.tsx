'use client'

import {AlignJustify} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {ReactNode, useState} from 'react'

import {merge} from '@/utils'

import {Header, Sidebar} from './components'
import {SmartphoneProvider} from './context/smartphone-context'
import {useValidateAuth} from './hooks'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  useValidateAuth()

  const [isOpen, setIsOpen] = useState(false)

  const navbarHandler = (
    <button
      className='bw btn outline xs compact'
      onClick={() => setIsOpen(prev => !prev)}>
      <AlignJustify size={18} />
    </button>
  )

  return (
    <SmartphoneProvider>
      <main
        className={merge([
          'flex h-screen  w-screen flex-col items-center',
          'bg-background-100',
        ])}>
        <section
          className={merge([
            'relative grid h-screen w-screen grid-cols-[1fr] grid-rows-[1fr]',
            'overflow-hidden md:grid-cols-[250px_1fr]',
          ])}>
          <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

          <div className='grid h-screen grid-rows-[56px_1fr]'>
            <Header navbarHandler={navbarHandler} />

            <section className='h-[calc(100vh-56px)] min-w-full gap-5 overflow-y-auto px-5 pb-16 pt-10 md:p-10'>
              {children}
            </section>
          </div>
        </section>
      </main>
    </SmartphoneProvider>
  )
})

export default AdminLayout

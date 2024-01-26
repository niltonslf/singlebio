'use client'

import {AlignJustify} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {ReactNode, useState} from 'react'

import {merge} from '@/utils'

import {Header, Sidebar} from './components'
import {useValidateAuth} from './hooks'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  useValidateAuth()

  const [isOpen, setIsOpen] = useState(false)

  const navbarHandler = (
    <button
      className='btn btn-square btn-outline btn-sm'
      onClick={() => setIsOpen(prev => !prev)}>
      <AlignJustify size={18} />
    </button>
  )

  return (
    <main
      className={merge([
        'flex h-screen  w-screen flex-col items-center',
        'bg-base-100',
      ])}>
      <section
        className={merge([
          'relative grid h-screen w-screen grid-cols-[1fr] grid-rows-[1fr]',
          'overflow-hidden md:grid-cols-[250px_1fr]',
        ])}>
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <div className='grid h-screen grid-rows-[60px_1fr]'>
          <Header navbarHandler={navbarHandler} />

          <section className='h-[calc(100vh-60px)] min-w-full gap-5 overflow-y-auto px-5 pb-16 pt-0 md:px-10 md:py-0'>
            {children}
          </section>
        </div>
      </section>
    </main>
  )
})

export default AdminLayout

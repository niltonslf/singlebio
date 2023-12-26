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

  return (
    <SmartphoneProvider>
      <main
        className={merge([
          'flex h-screen  w-screen flex-col items-center',
          ' bg-gradient-to-tr  from-background-900 from-20%',
          ' via-primary-900 via-45%  to-background-1000 to-70% ',
          ' bg-background-900',
        ])}>
        <section className='relative grid h-screen w-screen grid-cols-[1fr] grid-rows-[1fr]  overflow-hidden bg-background-100 bg-opacity-95 md:grid-cols-[250px_1fr]'>
          <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

          <div className='grid h-screen grid-rows-[56px_1fr] px-0 md:px-10'>
            <Header
              navbarHandler={
                <button
                  className='bw btn outline xs compact'
                  onClick={() => setIsOpen(prev => !prev)}>
                  <AlignJustify size={18} />
                </button>
              }
            />

            <section className='h-[calc(100vh-56px)] min-w-full overflow-y-auto px-5  pb-14 md:-mr-10 md:px-0 md:pb-0'>
              {children}
            </section>
          </div>
        </section>
      </main>
    </SmartphoneProvider>
  )
})

export default AdminLayout

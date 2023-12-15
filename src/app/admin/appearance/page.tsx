'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {useAdmin} from '../context/admin-context'

type AppearancePageProps = {
  any?: any
}

const AppearancePage = observer(({}: AppearancePageProps) => {
  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef} = useAdmin()

  useEffect(() => {
    setSmartphoneRef(iframe)
  }, [iframe, setSmartphoneRef])
  return (
    <main className='grid min-h-[calc(100%-80px)] w-full grid-cols-1 gap-3 md:grid-cols-[3fr_1.5fr] md:grid-rows-[1fr]'>
      <section className='flex h-auto  flex-col rounded-lg bg-gray-800 px-4 md:p-10'>
        here
      </section>

      <aside className='grid w-full grid-rows-1 rounded-lg bg-gray-800'>
        <div className=' flex flex-1 items-start justify-center px-6 pt-4'>
          <div className='sticky top-6'>
            {authStore?.user?.userName && (
              <Smartphone
                ref={iframe}
                iframeUrl={`${authStore?.user?.userName}`}
              />
            )}
          </div>
        </div>
      </aside>
    </main>
  )
})

export default AppearancePage

'use client'

import {ChevronDownIcon, ChevronUpIcon} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {Layout} from '../components'
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
    <Layout>
      <Layout.Content>
        <article
          tabIndex={0}
          className=' overflow-hidden rounded-md border
          [&:has(input:checked)>div]:grid-rows-[1fr] 
          [&:has(input:checked)_header_.icon-down]:hidden 
          [&:has(input:checked)_header_.icon-up]:block 
        '>
          <header className='relative w-full'>
            <input
              type='checkbox'
              id='toggle'
              className='reset absolute inset-0 z-10 cursor-pointer outline-0'
            />
            <label
              htmlFor='toggle'
              className='color flex justify-between bg-white p-3'>
              <span>header</span>
              <ChevronDownIcon className='icon-down' />
              <ChevronUpIcon className='icon-up hidden' />
            </label>
          </header>

          <div
            className='grid grid-rows-[0fr] 
            bg-gray-200
            transition-[grid-template-rows]
            ease-in-out
            '>
            <div className='box-border overflow-hidden'>
              <div className='p-3'>
                <p>
                  tabIndex={0} attribute is necessary to make the div focusable
                </p>
                <p>
                  tabIndex={0} attribute is necessary to make the div focusable
                </p>
                <p>
                  tabIndex={0} attribute is necessary to make the div focusable
                </p>
                <p>
                  tabIndex={0} attribute is necessary to make the div focusable
                </p>
                <p>
                  tabIndex={0} attribute is necessary to make the div focusable
                </p>
              </div>
            </div>
          </div>
        </article>
      </Layout.Content>

      <Layout.Sidebar>
        <div className='sticky top-6'>
          {authStore?.user?.userName && (
            <Smartphone
              ref={iframe}
              iframeUrl={`${authStore?.user?.userName}`}
            />
          )}
        </div>
      </Layout.Sidebar>
    </Layout>
  )
})

export default AppearancePage

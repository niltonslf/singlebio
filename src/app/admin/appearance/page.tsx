'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {Collapse, Layout} from '../components'
import {useAdmin} from '../context/admin-context'
import {Wallpaper} from './components'

const AppearancePage = observer(() => {
  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef, updateSmartphoneSrc} = useAdmin()

  const iframeUrl = `${authStore.user?.userName}`

  useEffect(() => {
    setSmartphoneRef(iframe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframe])

  return (
    <Layout>
      <Layout.Content>
        <Collapse defaultOpen={1}>
          <Collapse.Item key={'wallpaper'} index={1}>
            <Collapse.Header>Page wallpaper</Collapse.Header>
            <Collapse.Body>
              <Wallpaper />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item key={'button-color'} index={2}>
            <Collapse.Header>Button Collor</Collapse.Header>
            <Collapse.Body>
              <p>Return a preset of options</p>
            </Collapse.Body>
          </Collapse.Item>
        </Collapse>
      </Layout.Content>

      <Layout.Sidebar>
        <div className='sticky top-6'>
          {authStore?.user?.userName && (
            <Smartphone ref={iframe} iframeUrl={iframeUrl} />
          )}
        </div>
      </Layout.Sidebar>
    </Layout>
  )
})

export default AppearancePage

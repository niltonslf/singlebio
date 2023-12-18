'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {Collapse, Layout} from '../components'
import {useAdmin} from '../context/admin-context'
import {
  CustomizeWallpaper,
  CustomizeButtons,
  CustomizeUsername,
} from './components'

const AppearancePage = observer(() => {
  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef, updateSmartphoneSrc} = useAdmin()

  const iframeUrl = `${authStore.user?.username}`

  useEffect(() => {
    setSmartphoneRef(iframe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframe])

  return (
    <Layout>
      <Layout.Content>
        <Collapse defaultOpen={3}>
          <Collapse.Item key={'wallpaper'} index={1}>
            <Collapse.Header>Page wallpaper</Collapse.Header>
            <Collapse.Body>
              <CustomizeWallpaper />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item key={'button-color'} index={2}>
            <Collapse.Header>Button Color</Collapse.Header>
            <Collapse.Body>
              <CustomizeButtons />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item key={'button-color'} index={3}>
            <Collapse.Header>Username color</Collapse.Header>
            <Collapse.Body>
              <CustomizeUsername />
            </Collapse.Body>
          </Collapse.Item>
        </Collapse>
      </Layout.Content>

      <Layout.Sidebar>
        <div className='sticky top-6'>
          {authStore?.user?.username && (
            <Smartphone ref={iframe} iframeUrl={iframeUrl} />
          )}
        </div>
      </Layout.Sidebar>
    </Layout>
  )
})

export default AppearancePage

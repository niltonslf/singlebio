'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {Collapse, Layout} from '../components'
import {useAdmin} from '../context/admin-context'
import {
  CustomizeButtons,
  CustomizeUsername,
  CustomizeWallpaper,
} from './components'
import {appearanceStore} from './context'

const AppearancePage = observer(() => {
  const {user} = authStore
  const previewUrl = appearanceStore.previewUrl

  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef, updateSmartphoneSrc} = useAdmin()

  const handleSaveAppearance = () => {
    //
  }

  const handleResetAppearance = () => {
    appearanceStore.reset()
  }

  // update iframe on every change
  useEffect(() => {
    updateSmartphoneSrc(`/${user?.username}/${previewUrl}`)
  }, [previewUrl, updateSmartphoneSrc, user?.username])

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

        <div className='mt-5 flex flex-row items-center gap-5 border-t border-t-gray-500 pt-5'>
          <button
            className='rounded bg-blue-600 px-14 py-2 font-bold text-white hover:bg-blue-800'
            onClick={() => handleSaveAppearance()}>
            Save
          </button>
          <button
            className='rounded bg-red-600 px-14 py-2 font-bold text-white hover:bg-red-800'
            onClick={() => handleResetAppearance()}>
            Reset
          </button>
        </div>
      </Layout.Content>

      <Layout.Sidebar>
        <div className='sticky top-6'>
          <Smartphone ref={iframe} />
        </div>
      </Layout.Sidebar>
    </Layout>
  )
})

export default AppearancePage

'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Button, Smartphone} from '@/app/components'

import {Collapse, Layout} from '../components'
import {useSmartphone} from '../context/smartphone-context'
import {
  CustomizeButtons,
  CustomizeUsername,
  CustomizeWallpaper,
} from './components'
import {appearanceStore} from './context'
import {useBackgroundUpload, useImageCompressor} from './hooks'

const AppearancePage = observer(() => {
  const {user} = authStore
  const {previewUrl, theme, aux} = appearanceStore

  const {iframeRef, updateSmartphoneSrc} = useSmartphone()
  const {compress} = useImageCompressor()
  const {upload} = useBackgroundUpload()

  const [updated, setUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const scheduleCloseSuccessMsg = () => {
    setTimeout(() => setUpdated(false), 5000)
  }

  const handleSaveAppearance = async () => {
    const data = {theme}
    setIsLoading(true)

    if (aux.backgroundFile && theme.backgroundImage) {
      const newImage = await compress(aux.backgroundFile)
      const url = await upload(newImage)

      data.theme.backgroundImage = url
      appearanceStore.setBackgroundFile(undefined)
    }

    await authStore.updateUser(data)
    setUpdated(true)
    scheduleCloseSuccessMsg()
    setIsLoading(false)
  }

  const handleResetAppearance = () => appearanceStore.reset()

  // update iframe on every change
  useEffect(() => {
    updateSmartphoneSrc(`/${user?.username}/${previewUrl}`)
  }, [previewUrl, updateSmartphoneSrc, user?.username])

  useEffect(() => {
    if (user?.theme) appearanceStore.setTheme(user?.theme)
  }, [user?.theme])

  return (
    <Layout>
      <Layout.Content>
        {appearanceStore.hasChanges && (
          <div className='mb-5 flex flex-row items-center rounded-lg border border-orange-900 bg-orange-200 p-5 font-medium'>
            The changes are not applied yet. You must save to apply them.
          </div>
        )}

        <Collapse defaultOpen={1} toggle>
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

        {updated ? (
          <div className='mt-5 flex flex-row items-center rounded-lg border border-green-900 bg-green-200 p-5 font-medium'>
            Appearance published with success! You can check on your profile
            link.
          </div>
        ) : (
          <div className='mt-5 flex flex-row items-center gap-5 border-t border-t-gray-500 pt-5'>
            <Button
              variant='primary'
              onClick={() => handleSaveAppearance()}
              isLoading={isLoading}>
              Save
            </Button>
            <Button variant='error' onClick={() => handleResetAppearance()}>
              Reset
            </Button>
          </div>
        )}
      </Layout.Content>

      <Layout.Sidebar>
        <div className='sticky top-6'>
          <Smartphone ref={iframeRef} />
        </div>
      </Layout.Sidebar>
    </Layout>
  )
})

export default AppearancePage

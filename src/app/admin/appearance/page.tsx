'use client'

import {AlertTriangle, CheckCircle} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {useImageUploader, useImageCompressor} from '@/app/admin/hooks'
import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {Collapse, AdminBaseLayout} from '../components'
import {useSmartphone} from '../context/smartphone-context'
import {
  CustomizeButtons,
  CustomizeUsername,
  CustomizeWallpaper,
} from './components'
import {appearanceStore} from './context'

const AppearancePage = observer(() => {
  const {user} = authStore
  const {theme, aux} = appearanceStore

  const {iframeRef} = useSmartphone()
  const {compress} = useImageCompressor()
  const {upload} = useImageUploader()

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
      const url = await upload(newImage, 'wallpaper')

      data.theme.backgroundImage = url
      appearanceStore.setBackgroundFile(undefined)
    }

    await authStore.updateUser(data)
    setUpdated(true)
    scheduleCloseSuccessMsg()
    setIsLoading(false)
  }

  const handleResetAppearance = () => appearanceStore.reset()

  useEffect(() => {
    if (user?.theme) appearanceStore.setTheme(user?.theme)
  }, [user?.theme])

  // if (!user) return <PageLoader />

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <h1 className='mb-8 text-2xl font-semibold'>Appearance</h1>

        {appearanceStore.hasChanges && (
          <div role='alert' className='alert alert-warning mb-5'>
            <AlertTriangle />
            <p>The changes are not applied yet. You must save to apply them.</p>
          </div>
        )}

        <Collapse toggle defaultOpen={1}>
          <Collapse.Item key={'wallpaper'} index={1}>
            <Collapse.Header>Page wallpaper</Collapse.Header>
            <Collapse.Body>
              <CustomizeWallpaper />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item key={'button'} index={2}>
            <Collapse.Header>Buttons</Collapse.Header>
            <Collapse.Body>
              <CustomizeButtons />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item key={'username'} index={3}>
            <Collapse.Header>Name and bio</Collapse.Header>
            <Collapse.Body>
              <CustomizeUsername />
            </Collapse.Body>
          </Collapse.Item>
        </Collapse>

        {updated ? (
          <div role='alert' className='alert alert-success mb-5'>
            <CheckCircle />
            Theme published with success! You can check on your profile link.
          </div>
        ) : (
          <>
            <div className='divider'></div>

            <div className='flex flex-row flex-nowrap items-center gap-5'>
              <button
                className='btn btn-primary btn-md btn-wide '
                onClick={() => handleSaveAppearance()}>
                {isLoading && <span className='loading loading-spinner'></span>}
                Save
              </button>
              <button
                className='btn btn-info btn-md btn-wide'
                onClick={() => handleResetAppearance()}>
                Reset
              </button>
            </div>
          </>
        )}
      </AdminBaseLayout.Content>

      <AdminBaseLayout.PagePreview>
        <Smartphone
          ref={iframeRef}
          iframeUrl={appearanceStore.getPreviewUrl(user?.username ?? '')}
        />
      </AdminBaseLayout.PagePreview>
    </AdminBaseLayout>
  )
})

export default AppearancePage

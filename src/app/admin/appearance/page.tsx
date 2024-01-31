'use client'

import {AlertTriangle} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {PagePreview, toastAlertStore} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {useImageUploader, useImageCompressor} from '@/app/admin/hooks'
import {authStore} from '@/app/auth/context/auth-store'

import {Collapse, AdminBaseLayout} from '../components'
import {
  CustomizeButtons,
  CustomizeSocialLinks,
  CustomizeUsername,
  CustomizeWallpaper,
} from './components'
import {appearanceStore} from './context'

const AppearancePage = observer(() => {
  const {user, socialPages, pageLinks} = adminStore
  const {theme, aux} = appearanceStore

  const {compress} = useImageCompressor()
  const {upload} = useImageUploader()

  const [isLoading, setIsLoading] = useState(false)

  const handleSaveAppearance = async () => {
    const data = {theme}

    if (aux.backgroundFile && theme.backgroundImage) {
      const newImage = await compress(aux.backgroundFile)
      const url = await upload(newImage, 'wallpaper')

      data.theme.backgroundImage = url
      appearanceStore.setBackgroundFile(undefined)
    }

    await authStore.updateUser(data)
    setIsLoading(false)

    toastAlertStore.show({
      title: 'Theme published with success!',
      message: 'You can check on your page link.',
      type: 'success',
    })
  }

  const handleResetAppearance = () => appearanceStore.reset()

  useEffect(() => {
    if (user?.theme) appearanceStore.setTheme(user?.theme)
  }, [user?.theme])

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
          <Collapse.Item index={1}>
            <Collapse.Header>Page wallpaper</Collapse.Header>
            <Collapse.Body>
              <CustomizeWallpaper />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item index={2}>
            <Collapse.Header>Header </Collapse.Header>
            <Collapse.Body>
              <CustomizeUsername />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item index={3}>
            <Collapse.Header>Social links</Collapse.Header>
            <Collapse.Body>
              <CustomizeSocialLinks />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item index={4}>
            <Collapse.Header>Page Links</Collapse.Header>
            <Collapse.Body>
              <CustomizeButtons />
            </Collapse.Body>
          </Collapse.Item>
        </Collapse>

        <div className='divider'></div>

        <div className='flex flex-row flex-nowrap items-center gap-5'>
          <button
            className='btn btn-primary btn-md flex-[2] md:btn-wide'
            onClick={() => handleSaveAppearance()}>
            {isLoading && <span className='loading loading-spinner'></span>}
            Save
          </button>
          <button
            className='btn btn-md flex-1 bg-base-300 md:btn-wide'
            onClick={() => handleResetAppearance()}>
            Reset
          </button>
        </div>
      </AdminBaseLayout.Content>

      <AdminBaseLayout.PagePreview>
        <PagePreview
          pageLinks={pageLinks}
          socialPages={socialPages}
          user={user}
          theme={theme}
        />
      </AdminBaseLayout.PagePreview>
    </AdminBaseLayout>
  )
})

export default AppearancePage

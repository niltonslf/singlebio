'use client'

import {AlertTriangle, Link2, PaintBucket, Share2, Text} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {PagePreview, toastAlertStore} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'

import {Collapse, AdminBaseLayout} from '../components'
import {
  CustomizeButtons,
  CustomizeSocialLinks,
  CustomizeUsername,
  CustomizeWallpaper,
} from './components'
import {appearanceStore} from './context'

const AppearancePage = observer(() => {
  const {user, socialPages, pageLinks, features} = adminStore
  const {theme} = appearanceStore

  const [isLoading, setIsLoading] = useState(false)

  const handleSaveAppearance = async () => {
    const data = {theme}

    await adminStore.updateUser(data)
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
            <Collapse.Header>
              <div className='flex w-full items-center gap-3'>
                <div className='rounded-md bg-purple-600 p-2'>
                  <PaintBucket size={15} />
                </div>
                <span className='mr-auto'>Background</span>
              </div>
            </Collapse.Header>
            <Collapse.Body>
              <CustomizeWallpaper />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item index={2}>
            <Collapse.Header>
              <div className='flex w-full items-center gap-3'>
                <div className='rounded-md bg-orange-600 p-2'>
                  <Text size={15} />
                </div>
                <span className='mr-auto'>Profile</span>
              </div>
            </Collapse.Header>
            <Collapse.Body>
              <CustomizeUsername />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item index={3}>
            <Collapse.Header>
              <div className='flex w-full items-center gap-3'>
                <div className='rounded-md bg-pink-600 p-2'>
                  <Share2 size={15} />
                </div>
                <span className='mr-auto'>Social</span>
              </div>
            </Collapse.Header>
            <Collapse.Body>
              <CustomizeSocialLinks />
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item index={4}>
            <Collapse.Header>
              <div className='flex w-full items-center gap-3'>
                <div className='rounded-md bg-blue-600 p-2'>
                  <Link2 size={15} />
                </div>
                <span className='mr-auto'>Links</span>
              </div>
            </Collapse.Header>
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
          features={features}
        />
      </AdminBaseLayout.PagePreview>
    </AdminBaseLayout>
  )
})

export default AppearancePage

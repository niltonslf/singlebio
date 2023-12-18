'use client'

import {doc, updateDoc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {ChangeEvent, useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'
import {db} from '@/libs/firebase'

import {Collapse, Layout} from '../components'
import {useAdmin} from '../context/admin-context'
import {useImageCompressor} from './hooks/image-compressor'
import {useWallpaperUploader} from './hooks/wallpaper-uploader'

const AppearancePage = observer(() => {
  const iframe = useRef<HTMLIFrameElement>(null)

  const {setSmartphoneRef, reloadSmartphoneList} = useAdmin()
  const {upload} = useWallpaperUploader()
  const {compress} = useImageCompressor()

  const handleSelectPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!authStore.user?.uid) return
    const file = event?.target?.files?.[0] || undefined

    if (!file) return 'You must select a file'

    const fileArray = await file.arrayBuffer()
    // compress imagem
    const newImage = await compress(fileArray)
    // upload image
    const url = await upload(newImage)
    //  save image url
    await updateDoc(doc(db, 'users', authStore.user?.uid), {wallpaperUrl: url})
    // reload smartphone
    reloadSmartphoneList()
  }

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
              <div className='mb-5'>
                <h1>Select the wallpaper</h1>

                <div>
                  <label
                    htmlFor='wallpaper-file'
                    className='flex w-full cursor-pointer flex-row items-center justify-center border-2 border-dashed border-gray-500 p-10 text-center text-xl text-gray-500'>
                    Drag your file or click here to select your wallpaper
                  </label>
                  <input
                    id='wallpaper-file'
                    type='file'
                    accept='image/x-png,image/jpeg'
                    multiple={false}
                    onChange={e => handleSelectPicture(e)}
                  />
                </div>
              </div>

              <h2>Customize the overlay</h2>
              <div>
                <p>Add color picker</p>
                <p>Add transparency</p>
              </div>
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

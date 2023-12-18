'use client'

import {observer} from 'mobx-react-lite'
import {ChangeEvent, useEffect, useRef, useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'
import {Colorful} from '@uiw/react-color'

import {Collapse, Layout} from '../components'
import {useAdmin} from '../context/admin-context'
import {useImageCompressor} from './hooks/image-compressor'
import {useWallpaperUploader} from './hooks/wallpaper-uploader'

const AppearancePage = observer(() => {
  const iframe = useRef<HTMLIFrameElement>(null)
  const boxRef = useRef<HTMLLabelElement>(null)

  const {setSmartphoneRef, reloadSmartphoneList} = useAdmin()
  const {upload} = useWallpaperUploader()
  const {compress} = useImageCompressor()

  const [hasImage, setHasImage] = useState(false)
  const [color, setColor] = useState('#000')

  const handleImageThumbnail = (file: File) => {
    const src = URL.createObjectURL(file)
    const image = document.createElement('img')
    image.setAttribute('src', src)
    boxRef.current?.insertAdjacentElement('beforeend', image)

    setHasImage(true)
  }

  const handleSelectPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!authStore.user?.uid) return
    const file = event?.target?.files?.[0] || undefined

    if (!file) return 'You must select a file'

    handleImageThumbnail(file)
    const fileArray = await file.arrayBuffer()

    // // compress imagem
    // const newImage = await compress(fileArray)
    // // upload image
    // const url = await upload(newImage)
    // //  save image url
    // await updateDoc(doc(db, 'users', authStore.user?.uid), {wallpaperUrl: url})
    // // reload smartphone
    // reloadSmartphoneList()
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
                <h1 className='font-mg font-semibold'>
                  1. Select the wallpaper
                </h1>

                <div className='mt-5'>
                  <label
                    ref={boxRef}
                    htmlFor='wallpaper-file'
                    className='relative flex w-full cursor-pointer flex-row items-center justify-center border-2 border-dashed border-gray-500 p-10 text-center text-xl text-gray-500'>
                    {!hasImage && (
                      <span>
                        Drag your file or click here to select your wallpaper
                      </span>
                    )}
                    <input
                      className='absolute left-0 top-0 h-full w-full border-2 border-red-700 opacity-0'
                      id='wallpaper-file'
                      type='file'
                      accept='image/x-png,image/jpeg'
                      multiple={false}
                      onChange={e => handleSelectPicture(e)}
                    />
                  </label>
                </div>
              </div>

              <div className='mt-5'>
                <h2 className='font-mg font-semibold'>
                  2. Customize the overlay
                </h2>

                <div className='mt-3'>
                  <Colorful
                    color={color}
                    onChange={color => setColor(color.hexa)}
                  />
                </div>
              </div>

              <div className='mt-5'>
                <h3 className='font-mg font-semibold'>3. All set</h3>
                <div className='mt-3 flex w-full flex-row justify-start gap-5'>
                  <button className='rounded-md bg-blue-600 px-8 py-2 text-white shadow-md hover:bg-blue-800'>
                    Publish
                  </button>
                  <button className='rounded-md bg-red-600 px-8 py-2 text-white shadow-md hover:bg-red-800'>
                    Cancel
                  </button>
                </div>
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

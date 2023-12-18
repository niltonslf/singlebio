/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import {updateDoc, doc} from 'firebase/firestore'
import {useRef, useState, ChangeEvent, useEffect} from 'react'

import {useAdmin} from '@/app/admin/context/admin-context'
import {authStore} from '@/app/auth/context/auth-store'
import {db} from '@/libs/firebase'
import {Colorful} from '@uiw/react-color'

import {useImageCompressor} from '../../hooks/image-compressor'
import {useWallpaperUploader} from '../../hooks/wallpaper-uploader'

export const Wallpaper = () => {
  const wallpaperRef = useRef<HTMLImageElement>(null)

  const {updateSmartphoneSrc, reloadSmartphoneList} = useAdmin()
  const {upload} = useWallpaperUploader()
  const {compress} = useImageCompressor()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [hasColorChanged, setHasColorChanged] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)

  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [color, setColor] = useState('#1c131368')
  const [wallpaperUrl, setWallpaperUrl] = useState('')

  const preparedColor = hasColorChanged ? color.replace('#', '%23') : ''
  const iframeUrl = `/${authStore?.user?.userName}/preview?color=${preparedColor}&wallpaperUrl=${wallpaperUrl}`

  const handleImageThumbnail = (file: File) => {
    return URL.createObjectURL(file)
  }

  const handleSelectPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] || undefined
    if (!file) return 'You must select a file'

    setWallpaperUrl(handleImageThumbnail(file))
    setImageFile(file)
    setHasImage(true)
  }

  const handleSave = async () => {
    if (!authStore.user?.uid) return setError(true)
    setIsLoading(true)

    const data = {wallpaperUrl: '', colorOverlay: ''}

    if (imageFile) {
      const newImage = await compress(imageFile)
      const url = await upload(newImage)
      data.wallpaperUrl = url
    }

    if (color && hasColorChanged) {
      data.colorOverlay = color
    }

    await updateDoc(doc(db, 'users', authStore.user?.uid), data)

    setIsLoading(false)
    setHasUpdated(true)
  }

  const handleReset = () => {
    setColor('')
    setWallpaperUrl('')
    setImageFile(undefined)
    setHasImage(false)
    setError(false)
  }

  useEffect(() => {
    updateSmartphoneSrc(iframeUrl)
    const unsubscribe = setTimeout(() => reloadSmartphoneList(), 500)

    return () => clearTimeout(unsubscribe)
  }, [iframeUrl, reloadSmartphoneList, updateSmartphoneSrc])

  return (
    <>
      <div className='mb-5'>
        <h1 className='font-mg font-semibold'>1. Select the wallpaper</h1>

        <div className='mt-5'>
          <label
            htmlFor='wallpaper-file'
            className='relative flex w-full cursor-pointer flex-row items-center justify-center border-2 border-dashed border-gray-500 p-10 text-center text-xl text-gray-500'>
            {!hasImage && (
              <span>Drag your file or click here to select your wallpaper</span>
            )}

            <img
              ref={wallpaperRef}
              src={wallpaperUrl}
              width='100%'
              height='auto'
              alt='wallpaper'
              className={clsx([wallpaperUrl ? 'block' : 'hidden'])}
            />

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
        <h2 className='font-mg font-semibold'>2. Customize the overlay</h2>

        <div className='mt-3'>
          <Colorful
            style={{width: '100%'}}
            color={color}
            onChange={color => {
              setColor(color.hexa)
              setHasColorChanged(true)
            }}
          />
        </div>
      </div>

      <div className='mt-5'>
        <h3 className='font-mg font-semibold'>3. All set</h3>
        <div className='mt-3 flex w-full flex-row items-center justify-start gap-5'>
          <button
            className={clsx([
              'rounded-md bg-blue-600 px-8 py-2 text-white shadow-md hover:bg-blue-800 disabled:bg-gray-500',
              hasUpdated ? 'disabled:bg-green-600' : '',
            ])}
            onClick={() => handleSave()}
            disabled={isLoading || hasUpdated}>
            {isLoading ? 'Publishing...' : hasUpdated ? 'Updated' : 'Publish'}
          </button>
          <button
            className='rounded-md bg-red-600 px-8 py-2 text-white shadow-md hover:bg-red-800 disabled:bg-gray-500'
            onClick={() => handleReset()}
            disabled={isLoading || hasUpdated}>
            Cancel
          </button>
          {error && (
            <div className='flex h-full flex-row items-center  text-red-600'>
              Ops! Something went wrong. Check if you're authenticated and try
              again.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

'use client'

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import {updateDoc, doc} from 'firebase/firestore'
import {Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useRef, useState, ChangeEvent, useEffect, useMemo} from 'react'
import {ColorPicker, useColor, ColorService} from 'react-color-palette'
import 'react-color-palette/css'

import {useAdmin} from '@/app/admin/context/admin-context'
import {authStore} from '@/app/auth/context/auth-store'
import {db} from '@/libs/firebase'
import {User} from '@/models'

import {useImageCompressor} from '../../hooks/image-compressor'
import {useWallpaperUploader} from '../../hooks/wallpaper-uploader'
import {makePreviewUrl} from '../../utils'

export const CustomizeWallpaper = observer(() => {
  const wallpaperRef = useRef<HTMLImageElement>(null)
  const user = authStore.user

  const {updateSmartphoneSrc, reloadSmartphoneList} = useAdmin()
  const {upload} = useWallpaperUploader()
  const {compress} = useImageCompressor()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)

  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [wallpaperUrl, setWallpaperUrl] = useState(user?.wallpaperUrl || '')
  const [color, setColor] = useColor(user?.colorOverlay || '#1c131368')

  let iframeUrl = useMemo(() => {
    const params = makePreviewUrl({
      buttonColor: user?.buttonColor,
      buttonTextColor: user?.buttonTextColor,
      usernameColor: user?.usernameColor,
      colorOverlay: color.hex,
      wallpaperUrl: wallpaperUrl,
    })

    return `/${user?.username}/preview?&${params}`
  }, [color.hex, wallpaperUrl, user])

  const handleRemoveWallpaper = () => {
    authStore.updateUser({...user, wallpaperUrl: undefined} as User)
    setWallpaperUrl('')
    setImageFile(undefined)
  }

  const handleImageThumbnail = (file: File) => {
    return URL.createObjectURL(file)
  }

  const handleSelectPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0] || undefined
    if (!file) return 'You must select a file'

    setWallpaperUrl(handleImageThumbnail(file))
    setImageFile(file)
  }

  const handleSave = async () => {
    if (!user?.uid) return setError(true)
    setIsLoading(true)

    const data = {wallpaperUrl: '', colorOverlay: ''}

    if (imageFile && wallpaperUrl) {
      const newImage = await compress(imageFile)
      const url = await upload(newImage)
      data.wallpaperUrl = url
    }

    if (!imageFile && wallpaperUrl) {
      data.wallpaperUrl = wallpaperUrl
    }

    if (color) {
      data.colorOverlay = color.hex
    }

    await updateDoc(doc(db, 'users', user?.uid), data)
    authStore.updateUser({...user, ...data})

    setIsLoading(false)
    setHasUpdated(true)
  }

  const handleReset = () => {
    setWallpaperUrl(user?.wallpaperUrl || '')

    const hex = user?.colorOverlay || '#1c131368'
    const rgb = ColorService.hex2rgb(hex)

    setColor({hex, rgb, hsv: ColorService.rgb2hsv(rgb)})
    setImageFile(undefined)
    setError(false)
  }

  useEffect(() => {
    let unsubscribe: string | number | NodeJS.Timeout | undefined = undefined

    if (hasUpdated) {
      unsubscribe = setTimeout(() => setHasUpdated(false), 5000)
    }

    return () => clearTimeout(unsubscribe)
  }, [hasUpdated])

  useEffect(() => {
    updateSmartphoneSrc(iframeUrl)
  }, [iframeUrl, reloadSmartphoneList, updateSmartphoneSrc])

  return (
    <>
      <section className='flex flex-row items-start gap-10'>
        <div className='mb-5 flex-1'>
          <h1 className='font-mg font-semibold'>Select the wallpaper</h1>

          <div className='mt-3'>
            <label
              htmlFor='wallpaper-file'
              className='group relative flex aspect-[1/0.82] min-h-[80px] w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-lg border-2 border-dashed  border-gray-500 text-center text-xl text-gray-500 '>
              {!wallpaperUrl && (
                <span className='cursor-pointer'>
                  Drag your file or click here to select your wallpaper
                </span>
              )}

              <img
                ref={wallpaperRef}
                src={wallpaperUrl}
                width='100%'
                alt='wallpaper'
                className={clsx([
                  wallpaperUrl ? 'block' : 'hidden',
                  'h-full rounded-lg object-cover',
                ])}
              />

              {wallpaperUrl && (
                <div
                  className='absolute left-0 top-0 z-50 hidden h-full w-full items-center justify-center bg-black bg-opacity-50 group-hover:flex'
                  onClick={event => {
                    event.preventDefault()
                    handleRemoveWallpaper()
                  }}>
                  <span className='group flex h-14 w-14 cursor-pointer items-center justify-center rounded-md bg-red-400 shadow-md hover:bg-red-600'>
                    <Trash width={30} height={30} color='white' />
                  </span>
                </div>
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

        <div className=' flex-1'>
          <h2 className='font-mg font-semibold'>Customize the overlay</h2>

          <div className='mt-3'>
            <ColorPicker
              hideInput={['rgb', 'hsv', 'hex']}
              color={color}
              onChange={e => {
                setColor(e)
              }}
            />
          </div>
        </div>
      </section>
      <div className='mt-5'>
        <h3 className='font-mg font-semibold'>All set</h3>
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
})

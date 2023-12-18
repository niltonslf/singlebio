'use client'

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import {updateDoc, doc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {useState, useEffect, useMemo} from 'react'
import {ColorPicker, ColorService, useColor} from 'react-color-palette'
import 'react-color-palette/css'

import {useAdmin} from '@/app/admin/context/admin-context'
import {authStore} from '@/app/auth/context/auth-store'
import {db} from '@/libs/firebase'

import {makePreviewUrl} from '../../utils'

export const CustomizeButtons = observer(() => {
  const user = authStore.user
  const {updateSmartphoneSrc, reloadSmartphoneList} = useAdmin()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)

  const [color, setColor] = useColor(user?.buttonColor || '#FFFFFF')
  const [colorText, setColorText] = useColor(user?.buttonTextColor || '#000')

  let iframeUrl = useMemo(() => {
    const params = makePreviewUrl({
      buttonColor: color.hex,
      buttonTextColor: colorText.hex,
      colorOverlay: user?.colorOverlay,
      usernameColor: user?.colorOverlay,
      wallpaperUrl: user?.wallpaperUrl,
    })

    return `/${user?.username}/preview?&${params}`
  }, [color.hex, colorText.hex, user])

  const handleSave = async () => {
    if (!user?.uid) return setError(true)
    setIsLoading(true)

    const data = {buttonColor: '', buttonTextColor: ''}

    if (color) {
      data.buttonColor = color.hex
    }
    if (colorText) {
      data.buttonTextColor = colorText.hex
    }

    await updateDoc(doc(db, 'users', user?.uid), data)
    authStore.updateUser({...user, ...data})

    setIsLoading(false)
    setHasUpdated(true)
  }

  const handleReset = () => {
    const hexButton = user?.buttonColor || '#FFFFFF'
    const rgbButton = ColorService.hex2rgb(hexButton)
    const hsvButton = ColorService.rgb2hsv(rgbButton)

    const hexText = user?.buttonTextColor || '#000'
    const rgbText = ColorService.hex2rgb(hexText)
    const hsvText = ColorService.rgb2hsv(rgbText)

    setColor({hex: hexButton, rgb: rgbButton, hsv: hsvButton})
    setColorText({hex: hexText, rgb: rgbText, hsv: hsvText})

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
      <div className='flex flex-row justify-between gap-10'>
        <div className='mt-5 flex-1'>
          <h2 className='font-mg font-semibold'>1. Button background</h2>

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

        <div className='mt-5 flex-1'>
          <h2 className='font-mg font-semibold'>2. Button text</h2>

          <div className='mt-3'>
            <ColorPicker
              hideInput={['rgb', 'hsv', 'hex']}
              color={colorText}
              onChange={e => {
                setColorText(e)
              }}
            />
          </div>
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
})

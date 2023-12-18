'use client'

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import {updateDoc, doc} from 'firebase/firestore'
import {useState, useEffect} from 'react'
import {ColorPicker, useColor} from 'react-color-palette'
import 'react-color-palette/css'

import {useAdmin} from '@/app/admin/context/admin-context'
import {authStore} from '@/app/auth/context/auth-store'
import {db} from '@/libs/firebase'

export const CustomizeButtons = () => {
  const {updateSmartphoneSrc, reloadSmartphoneList} = useAdmin()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasColorChanged, setHasColorChanged] = useState(false)
  const [hasUpdated, setHasUpdated] = useState(false)

  const [color, setColor] = useColor('#1c131368')
  const [colorText, setColorText] = useColor('#000')

  const preparedColor = hasColorChanged ? color.hex.replace('#', '%23') : ''
  const preparedTextColor = hasColorChanged
    ? colorText.hex.replace('#', '%23')
    : ''

  const iframeUrl = `/${authStore?.user?.userName}/preview?buttonColor=${preparedColor}&buttonTextColor=${preparedTextColor}`

  const handleSave = async () => {
    if (!authStore.user?.uid) return setError(true)
    setIsLoading(true)

    const data = {buttonColor: ''}

    if (color && hasColorChanged) {
      data.buttonColor = color.hex
    }

    await updateDoc(doc(db, 'users', authStore.user?.uid), data)

    setIsLoading(false)
    setHasUpdated(true)
  }

  const handleReset = () => {
    setError(false)
  }

  useEffect(() => {
    updateSmartphoneSrc(iframeUrl)
    const unsubscribe = setTimeout(() => reloadSmartphoneList(), 500)

    return () => clearTimeout(unsubscribe)
  }, [iframeUrl, reloadSmartphoneList, updateSmartphoneSrc])

  return (
    <>
      <div className='mt-5'>
        <h2 className='font-mg font-semibold'>1. Button background</h2>

        <div className='mt-3'>
          <ColorPicker
            hideInput={['rgb', 'hsv', 'hex']}
            color={color}
            onChange={e => {
              setColor(e)
              setHasColorChanged(true)
            }}
          />
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='font-mg font-semibold'>2. Button text</h2>

        <div className='mt-3'>
          <ColorPicker
            hideInput={['rgb', 'hsv', 'hex']}
            color={colorText}
            onChange={e => {
              setColorText(e)
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

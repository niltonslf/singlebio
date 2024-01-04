'use client'

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import {Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useRef, ChangeEvent} from 'react'

import {appearanceStore} from '@/app/admin/appearance/context'
import {useImageUploader} from '@/app/admin/hooks'
import {useDebounce} from '@/utils'

import {CustomColorPicker} from '..'

export const CustomizeWallpaper = observer(() => {
  const theme = appearanceStore?.theme

  const wallpaperRef = useRef<HTMLImageElement>(null)
  const {returnImageThumbnail} = useImageUploader()

  const debouncedBackgroundColor = useDebounce((color: string) => {
    appearanceStore.setBackgroundColor(color)
  })

  const handleRemoveWallpaper = () => {
    appearanceStore.setBackgroundImage('')
    appearanceStore.setBackgroundFile(undefined)
  }

  const handleSelectPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (file) {
      const url = returnImageThumbnail(file)
      appearanceStore.setBackgroundImage(url)
      appearanceStore.setBackgroundFile(file)
    }
  }

  return (
    <>
      <section className='flex flex-row flex-wrap items-start gap-10'>
        <div className='w-full md:w-auto md:flex-1'>
          <h1 className='text-base font-normal text-neutral-200'>
            Select the wallpaper
          </h1>

          <div className='mt-3'>
            <label
              htmlFor='wallpaper-file'
              className='group relative flex aspect-[1/0.82] min-h-[80px] w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-neutral-400  text-center text-xl text-neutral-400 '>
              {!theme.backgroundImage && (
                <span className='cursor-pointer'>
                  Drag your file or click here to select your wallpaper
                </span>
              )}

              <img
                ref={wallpaperRef}
                src={theme.backgroundImage}
                width='100%'
                alt='wallpaper'
                className={clsx([
                  theme.backgroundImage ? 'block' : 'hidden',
                  'h-full rounded-lg object-cover',
                ])}
              />

              {theme.backgroundImage && (
                <div
                  className='absolute left-0 top-0 z-50 hidden h-full w-full items-center justify-center bg-neutral-950 bg-opacity-50 group-hover:flex'
                  onClick={event => {
                    event.preventDefault()
                    handleRemoveWallpaper()
                  }}>
                  <span className='group btn btn-square btn-error btn-md'>
                    <Trash width={30} height={30} color='white' />
                  </span>
                </div>
              )}

              <input
                className='absolute left-0 top-0 h-full w-full border-2 border-error opacity-0'
                id='wallpaper-file'
                data-testid='wallpaper-file'
                type='file'
                accept='image/x-png,image/jpeg'
                multiple={false}
                onChange={handleSelectPicture}
              />
            </label>
          </div>
        </div>

        <div className='w-full md:w-auto md:flex-1'>
          <h2 className='text-base font-normal text-neutral-200'>
            Select the background color
          </h2>

          <div className='mt-3'>
            <CustomColorPicker
              color={theme.backgroundColor}
              onChange={color => debouncedBackgroundColor(color)}
            />
          </div>
        </div>
      </section>
    </>
  )
})

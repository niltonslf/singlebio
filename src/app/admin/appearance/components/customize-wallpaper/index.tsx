'use client'

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import {Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useRef, ChangeEvent} from 'react'
import {HexAlphaColorPicker} from 'react-colorful'

import {appearanceStore} from '@/app/admin/appearance/context'
import {useDebounce} from '@/utils'

export const CustomizeWallpaper = observer(() => {
  const theme = appearanceStore?.theme

  const wallpaperRef = useRef<HTMLImageElement>(null)

  const debouncedBackgroundColor = useDebounce((color: string) => {
    appearanceStore.setBackgroundColor(color)
  })

  const handleRemoveWallpaper = () => {
    appearanceStore.setBackgroundImage('')
    appearanceStore.setBackgroundFile(undefined)
  }

  const returnImageThumbnail = (file: File) => URL.createObjectURL(file)

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
          <h1 className='text-sm font-normal text-slate-300'>
            Select the wallpaper
          </h1>

          <div className='mt-3'>
            <label
              htmlFor='wallpaper-file'
              className='group relative flex aspect-[1/0.82] min-h-[80px] w-full cursor-pointer flex-row items-center justify-center overflow-hidden rounded-lg border-2 border-dashed  border-gray-500 text-center text-xl text-gray-500 '>
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
          <h2 className='text-sm font-normal text-slate-300'>
            Customize the overlay
          </h2>

          <div className='mt-3'>
            <HexAlphaColorPicker
              style={{width: '100%', height: '300px'}}
              color={theme.backgroundColor}
              onChange={color => debouncedBackgroundColor(color)}
            />
          </div>
        </div>
      </section>
    </>
  )
})

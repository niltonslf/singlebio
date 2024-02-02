'use client'

import {observer} from 'mobx-react-lite'

import {appearanceStore} from '@/app/admin/appearance/context'
import {useDebounce} from '@/utils'

import {CustomColorPicker} from '..'

export const CustomizeWallpaper = observer(() => {
  const theme = appearanceStore?.theme

  const debouncedBackgroundColor = useDebounce((color: string) => {
    appearanceStore.setBackgroundColor(color)
  })

  return (
    <>
      <section className='flex flex-row flex-wrap items-start gap-10'>
        <div className='w-full md:w-auto md:flex-1'>
          <h2 className='text-base font-normal text-base-content/70'>
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

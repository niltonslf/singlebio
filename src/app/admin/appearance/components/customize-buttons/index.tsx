'use client'

import {observer} from 'mobx-react-lite'

import {useDebounce} from '@/utils'

import {appearanceStore} from '../../context'

import {CustomColorPicker} from '..'

export const CustomizeButtons = observer(() => {
  const {theme} = appearanceStore

  const debouncedBackground = useDebounce((color: string) => {
    appearanceStore.setButtonBackground(color)
  }, 1000)

  const debouncedTextColor = useDebounce((color: string) => {
    appearanceStore.setButtonTextColor(color)
  }, 1000)

  return (
    <>
      <div className='flex flex-row flex-wrap justify-between gap-10'>
        <div className='mt-3 w-full md:w-auto md:flex-1'>
          <h2 className='text-base font-normal text-base-content/70'>
            Button background
          </h2>

          <div className='mt-3'>
            <CustomColorPicker
              color={theme.buttonBackground}
              onChange={color => debouncedBackground(color)}
            />
          </div>
        </div>

        <div className='mt-3 w-full md:w-auto md:flex-1'>
          <h2 className='text-base font-normal text-base-content/70'>
            Button text
          </h2>

          <div className='mt-3'>
            <CustomColorPicker
              color={theme.buttonTextColor}
              onChange={color => debouncedTextColor(color)}
            />
          </div>
        </div>
      </div>
    </>
  )
})

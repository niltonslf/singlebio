'use client'

/* eslint-disable @next/next/no-img-element */
import {observer} from 'mobx-react-lite'

import {useDebounce} from '@/utils'

import {appearanceStore} from '../../context'

import {CustomColorPicker} from '..'

export const CustomizeSocialLinks = observer(() => {
  const {theme} = appearanceStore

  const debounced = useDebounce((color: string) => {
    appearanceStore.setUsernameColor(color)
  })

  return (
    <>
      <div className='mt-3'>
        <h2 className='text-md font-normal text-neutral-200'>
          Select the icon color
        </h2>

        <div className='mt-3'>
          <label className='label cursor-pointer'>
            <span className='label-text'>Default colors</span>
            <input type='checkbox' className='toggle toggle-info' checked />
          </label>

          <CustomColorPicker
            color={theme.usernameColor}
            onChange={color => debounced(color)}
          />
        </div>
      </div>
    </>
  )
})

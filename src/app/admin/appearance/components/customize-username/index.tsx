'use client'

/* eslint-disable @next/next/no-img-element */
import {observer} from 'mobx-react-lite'

import {useDebounce} from '@/utils'

import {appearanceStore} from '../../context'

import {CustomColorPicker} from '..'

export const CustomizeUsername = observer(() => {
  const {theme} = appearanceStore

  const debounced = useDebounce((color: string) => {
    appearanceStore.setUsernameColor(color)
  })

  return (
    <>
      <div className='mt-3'>
        <h2 className='text-sm font-normal text-slate-300'>
          Select the texts color
        </h2>

        <div className='mt-3'>
          <CustomColorPicker
            color={theme.usernameColor}
            onChange={color => debounced(color)}
          />
        </div>
      </div>
    </>
  )
})

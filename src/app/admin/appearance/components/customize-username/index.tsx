'use client'

/* eslint-disable @next/next/no-img-element */
import {observer} from 'mobx-react-lite'
import {HexAlphaColorPicker} from 'react-colorful'

import {useDebounce} from '@/utils'

import {appearanceStore} from '../../context'

export const CustomizeUsername = observer(() => {
  const {theme} = appearanceStore

  const debounced = useDebounce((color: string) => {
    appearanceStore.setUsernameColor(color)
  })

  return (
    <>
      <div className='mt-3'>
        <h2 className='text-sm font-normal text-slate-300'>
          Select the username color
        </h2>

        <div className='mt-3'>
          <HexAlphaColorPicker
            className='!md:h-[300px] !h-[150px] !w-full'
            color={theme.usernameColor}
            onChange={color => debounced(color)}
          />
        </div>
      </div>
    </>
  )
})

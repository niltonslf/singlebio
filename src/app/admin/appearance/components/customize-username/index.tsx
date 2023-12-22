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
      <div className='mt-5'>
        <h2 className='font-mg font-semibold'>1. Select the username color</h2>

        <div className='mt-3'>
          <HexAlphaColorPicker
            style={{width: '300px', height: '300px'}}
            color={theme.usernameColor}
            onChange={color => debounced(color)}
          />
        </div>
      </div>
    </>
  )
})

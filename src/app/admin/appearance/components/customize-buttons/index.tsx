'use client'

import {observer} from 'mobx-react-lite'
import {HexAlphaColorPicker} from 'react-colorful'

import {useDebounce} from '@/utils'

import {appearanceStore} from '../../context'

export const CustomizeButtons = observer(() => {
  const {theme} = appearanceStore

  const debouncedBackground = useDebounce((color: string) => {
    appearanceStore.setButtonBackground(color)
  })

  const debouncedTextColor = useDebounce((color: string) => {
    appearanceStore.setButtonTextColor(color)
  })

  return (
    <>
      <div className='flex flex-row justify-between gap-10'>
        <div className='mt-5 flex-1'>
          <h2 className='font-mg font-semibold'>Button background</h2>

          <div className='mt-3'>
            <HexAlphaColorPicker
              style={{width: '100%', height: '300px'}}
              color={theme.buttonBackground}
              onChange={color => debouncedBackground(color)}
            />
          </div>
        </div>

        <div className='mt-5 flex-1'>
          <h2 className='font-mg font-semibold'>Button text</h2>

          <div className='mt-3'>
            <HexAlphaColorPicker
              style={{width: '100%', height: '300px'}}
              color={theme.buttonTextColor}
              onChange={color => debouncedTextColor(color)}
            />
          </div>
        </div>
      </div>
    </>
  )
})

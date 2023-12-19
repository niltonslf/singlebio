'use client'

/* eslint-disable @next/next/no-img-element */
import {observer} from 'mobx-react-lite'
import {ColorPicker, IColor, useColor} from 'react-color-palette'
import 'react-color-palette/css'

import {appearanceStore} from '../../context'

export const CustomizeButtons = observer(() => {
  const {theme} = appearanceStore

  const [btnBackground, setBtnBackground] = useColor(theme.buttonBackground)
  const [btnTextColor, setBtnTextColor] = useColor(theme.buttonTextColor)

  const handleChangeBackground = (color: IColor) => {
    setBtnBackground(color)
    appearanceStore.setButtonBackground(color.hex)
  }

  const handleChangeTextColor = (color: IColor) => {
    setBtnTextColor(color)
    appearanceStore.setButtonTextColor(color.hex)
  }

  return (
    <>
      <div className='flex flex-row justify-between gap-10'>
        <div className='mt-5 flex-1'>
          <h2 className='font-mg font-semibold'>Button background</h2>

          <div className='mt-3'>
            <ColorPicker
              hideInput={['rgb', 'hsv', 'hex']}
              color={btnBackground}
              onChange={handleChangeBackground}
            />
          </div>
        </div>

        <div className='mt-5 flex-1'>
          <h2 className='font-mg font-semibold'>Button text</h2>

          <div className='mt-3'>
            <ColorPicker
              hideInput={['rgb', 'hsv', 'hex']}
              color={btnTextColor}
              onChange={handleChangeTextColor}
            />
          </div>
        </div>
      </div>
    </>
  )
})

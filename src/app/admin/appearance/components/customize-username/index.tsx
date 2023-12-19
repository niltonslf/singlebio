'use client'

/* eslint-disable @next/next/no-img-element */
import {observer} from 'mobx-react-lite'
import {ColorPicker, IColor, useColor} from 'react-color-palette'
import 'react-color-palette/css'

import {appearanceStore} from '../../context'

export const CustomizeUsername = observer(() => {
  const {theme} = appearanceStore

  const [usernameColor, setUsernameColor] = useColor(theme.usernameColor)

  const handleChangeColor = (color: IColor) => {
    setUsernameColor(color)
    appearanceStore.setUsernameColor(color.hex)
  }

  return (
    <>
      <div className='mt-5'>
        <h2 className='font-mg font-semibold'>1. Select the username color</h2>

        <div className='mt-3'>
          <ColorPicker
            hideInput={['rgb', 'hsv', 'hex']}
            color={usernameColor}
            onChange={handleChangeColor}
          />
        </div>
      </div>
    </>
  )
})

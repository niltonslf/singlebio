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
        <div className='mt-3 w-full md:flex-1'>
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

        <div className='mt-3 w-full md:flex-1'>
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

      <div className='mt-5 flex w-full flex-row flex-wrap gap-5'>
        <h2 className='text-base font-normal text-base-content/70'>
          Button styles
        </h2>
        <div className='flex w-full flex-wrap gap-5 '>
          <input
            type='radio'
            name='button-style'
            aria-label='Default'
            value='default'
            checked={appearanceStore.theme.buttonStyle === 'default'}
            onChange={e => appearanceStore.setButtonStyle(e.target.value)}
            className='btn btn-info w-[calc(50%-0.625rem)] '
          />
          <input
            type='radio'
            name='button-style'
            aria-label='Square'
            value='square'
            checked={appearanceStore.theme.buttonStyle === 'square'}
            onChange={e => appearanceStore.setButtonStyle(e.target.value)}
            className='btn btn-info w-[calc(50%-0.625rem)]  rounded-none'
          />
          <input
            type='radio'
            name='button-style'
            aria-label='Circle'
            value='circle'
            checked={appearanceStore.theme.buttonStyle === 'circle'}
            onChange={e => appearanceStore.setButtonStyle(e.target.value)}
            className='btn btn-circle btn-info w-[calc(50%-0.625rem)] '
          />
          <input
            type='radio'
            name='button-style'
            aria-label='Circle outline'
            value='circle-outline'
            checked={appearanceStore.theme.buttonStyle === 'circle-outline'}
            onChange={e => appearanceStore.setButtonStyle(e.target.value)}
            className='btn btn-circle btn-outline btn-info w-[calc(50%-0.625rem)] '
          />
          <input
            type='radio'
            name='button-style'
            aria-label='Square outline'
            value='square-outline'
            checked={appearanceStore.theme.buttonStyle === 'square-outline'}
            onChange={e => appearanceStore.setButtonStyle(e.target.value)}
            className='btn btn-outline btn-info w-[calc(50%-0.625rem)]  rounded-none'
          />
          <input
            type='radio'
            name='button-style'
            aria-label='Outline'
            value='outline'
            checked={appearanceStore.theme.buttonStyle === 'outline'}
            onChange={e => appearanceStore.setButtonStyle(e.target.value)}
            className='btn btn-outline btn-info w-[calc(50%-0.625rem)]'
          />
        </div>
      </div>
    </>
  )
})

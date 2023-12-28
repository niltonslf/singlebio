'use client'

import clsx from 'clsx'
import {observer} from 'mobx-react-lite'

import {Avatar, LinkCard} from '@/app/components'

type UserPreviewProps = {
  params: {username: string}
  searchParams: {
    backgroundColor?: string
    backgroundImage?: string
    buttonBackground?: string
    buttonTextColor?: string
    usernameColor?: string
  }
}

const UserPreview = observer(
  ({params: {username}, searchParams}: UserPreviewProps) => {
    const {
      backgroundColor,
      backgroundImage,
      buttonBackground,
      buttonTextColor,
      usernameColor,
    } = searchParams

    const defaultBg =
      'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

    const backgroundColorStyle = {
      backgroundColor: `${decodeURIComponent(backgroundColor || '')}`,
    }

    const backgroundImageStyle = {
      backgroundImage: `url(${decodeURIComponent(backgroundImage || '')})`,
      ...backgroundColorStyle,
    }

    return (
      <main
        className={clsx([
          'flex h-screen w-screen bg-white bg-cover bg-center',
          !backgroundImage && !backgroundColor ? defaultBg : '',
        ])}
        style={backgroundImage ? backgroundImageStyle : {}}>
        <div
          className={clsx([
            'flex h-screen w-screen items-center justify-center overflow-y-auto p-5 py-20 md:p-10 ',
          ])}
          style={backgroundColor ? backgroundColorStyle : {}}>
          <div className=' h-full w-full max-w-2xl '>
            <div className='mb-4 flex w-full justify-center'>
              <Avatar name={username} size={80} />
            </div>

            <h2
              className='mb-3 flex items-center justify-center text-2xl font-semibold'
              style={
                usernameColor ? {color: decodeURIComponent(usernameColor)} : {}
              }>
              @{username}
            </h2>

            <LinkCard>
              <LinkCard.Item
                path='/admin'
                bgColor={decodeURIComponent(buttonBackground || '')}
                textColor={decodeURIComponent(buttonTextColor || '')}>
                Example 01
              </LinkCard.Item>
              <LinkCard.Item
                path='/admin'
                bgColor={decodeURIComponent(buttonBackground || '')}
                textColor={decodeURIComponent(buttonTextColor || '')}>
                Example 02
              </LinkCard.Item>
              <LinkCard.Item
                path='/admin'
                bgColor={decodeURIComponent(buttonBackground || '')}
                textColor={decodeURIComponent(buttonTextColor || '')}>
                Example 03
              </LinkCard.Item>
              <LinkCard.Item
                path='/admin'
                bgColor={decodeURIComponent(buttonBackground || '')}
                textColor={decodeURIComponent(buttonTextColor || '')}>
                Example 04
              </LinkCard.Item>
            </LinkCard>
          </div>
        </div>
      </main>
    )
  },
)
export default UserPreview

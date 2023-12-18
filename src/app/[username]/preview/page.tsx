'use client'

import clsx from 'clsx'
import {observer} from 'mobx-react-lite'

import {Avatar, LinkCard} from '@/app/components'

type UserPreviewProps = {
  params: {username: string}
  searchParams: {
    colorOverlay?: string
    wallpaperUrl?: string
    buttonColor?: string
    buttonTextColor?: string
    usernameColor?: string
  }
}

const UserPreview = observer(
  ({params: {username}, searchParams}: UserPreviewProps) => {
    const {
      colorOverlay,
      wallpaperUrl,
      buttonColor,
      buttonTextColor: textColor,
      usernameColor,
    } = searchParams

    const wallpaperStyle = {
      backgroundImage: `url(${decodeURIComponent(wallpaperUrl || '')})`,
    }
    const colorStyle = {
      backgroundColor: `${decodeURIComponent(colorOverlay || '')}`,
    }

    return (
      <main
        className={clsx(['flex h-screen w-screen bg-white bg-cover bg-center'])}
        style={wallpaperUrl ? wallpaperStyle : {}}>
        <div
          className={clsx([
            'flex h-screen w-screen items-center justify-center overflow-y-auto p-5 py-20 md:p-10 ',
          ])}
          style={colorOverlay ? colorStyle : {}}>
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

            <LinkCard.container>
              <LinkCard.item
                path='/admin'
                bgColor={decodeURIComponent(buttonColor || '')}
                textColor={decodeURIComponent(textColor || '')}>
                Example 01
              </LinkCard.item>
              <LinkCard.item
                path='/admin'
                bgColor={decodeURIComponent(buttonColor || '')}
                textColor={decodeURIComponent(textColor || '')}>
                Example 02
              </LinkCard.item>
              <LinkCard.item
                path='/admin'
                bgColor={decodeURIComponent(buttonColor || '')}
                textColor={decodeURIComponent(textColor || '')}>
                Example 03
              </LinkCard.item>
              <LinkCard.item
                path='/admin'
                bgColor={decodeURIComponent(buttonColor || '')}
                textColor={decodeURIComponent(textColor || '')}>
                Example 04
              </LinkCard.item>
            </LinkCard.container>
          </div>
        </div>
      </main>
    )
  },
)
export default UserPreview

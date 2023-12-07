'use client'

import Image from 'next/image'

type AvatarProps = {
  pictureUrl?: string
  name: string
  size?: number
}

export const Avatar = ({pictureUrl, name, size = 50}: AvatarProps) => {
  return (
    <div
      className='relative flex aspect-square items-center justify-center rounded-full bg-gray-900 font-bold text-white'
      style={{width: size, fontSize: size * 0.5}}>
      <span>{name.charAt(0)}</span>
      {pictureUrl && (
        <Image
          src={pictureUrl}
          width={size}
          height={size}
          alt={name}
          className='absolute left-0 top-0 rounded-full border-[3px] border-gray-900'
        />
      )}
    </div>
  )
}

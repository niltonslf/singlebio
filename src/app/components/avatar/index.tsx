'use client'

import Image from 'next/image'
import {HTMLAttributes} from 'react'

import {merge} from '@/utils'

type AvatarProps = {
  pictureUrl?: string
  name: string
  size?: number
  className?: HTMLAttributes<HTMLDivElement>['className']
}

export const Avatar = ({
  pictureUrl,
  name,
  size = 50,
  className = '',
}: AvatarProps) => {
  return (
    <div
      className={merge([
        'relative flex aspect-square items-center justify-center rounded-full bg-gray-900 font-bold text-white',
      ])}
      style={{width: size, fontSize: size * 0.5}}>
      <span>{name.charAt(0)}</span>
      {pictureUrl && (
        <Image
          src={pictureUrl}
          width={size}
          height={size}
          alt={name}
          className={merge([
            'absolute left-0 top-0 rounded-full border-[3px] border-gray-900',
            className,
          ])}
        />
      )}
    </div>
  )
}

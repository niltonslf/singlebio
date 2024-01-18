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
        'relative flex aspect-square max-w-full items-center justify-center rounded-full  bg-base-100 font-bold text-neutral-50',
        !pictureUrl ? className : '',
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
            'absolute left-0 top-0 h-full w-full rounded-full border-[3px] border-neutral object-cover',
            className,
          ])}
        />
      )}
    </div>
  )
}

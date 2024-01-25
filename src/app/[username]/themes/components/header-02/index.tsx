import clsx from 'clsx'

import {Avatar} from '@/app/components'
import {User} from '@/domain/models'

type Header02Props = {
  user: User
  pageStyles: any
}

export const Header02 = ({user, pageStyles}: Header02Props) => {
  return (
    <header className='relative z-20 mb-5 w-full'>
      <div className='mb-4 flex w-full justify-center'>
        <div
          className={clsx(['rounded-full border-[10px]'])}
          style={{
            borderColor:
              `rgb(from ${user.theme?.backgroundColor} r g b / 1)` ?? '#f9f9f9',
          }}>
          <div className='rounded-full shadow-md shadow-black/50'>
            <Avatar
              name={user?.name ?? ''}
              pictureUrl={user?.pictureUrl ?? ''}
              size={120}
            />
          </div>
        </div>
      </div>

      {user?.name && (
        <h2
          className='mb-2 flex items-center justify-center text-2xl font-semibold text-neutral-900'
          style={{color: user.theme?.usernameColor}}>
          {user?.name}
        </h2>
      )}

      {user?.bio && (
        <p
          className='w-full break-before-auto text-center text-sm text-neutral-900'
          style={pageStyles.usernameColor}>
          {user?.bio}
        </p>
      )}
    </header>
  )
}

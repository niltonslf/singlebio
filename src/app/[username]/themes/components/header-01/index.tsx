import clsx from 'clsx'

import {Avatar} from '@/app/components'
import {User, UserTheme} from '@/domain/models'

type Header01Props = {
  user: User
  theme: UserTheme
}

export const Header01 = ({user, theme}: Header01Props) => {
  return (
    <header className='mb-5 w-full'>
      <div className='mb-4 flex w-full justify-center'>
        <Avatar
          name={user?.name ?? ''}
          pictureUrl={user?.pictureUrl ?? ''}
          size={100}
          className={clsx([
            theme?.name === 'arch'
              ? 'border-[10px] border-[#f9f9f9] bg-[#f9f9f9]'
              : '',
          ])}
        />
      </div>

      {user?.name && (
        <h2
          className='mb-2 flex items-center justify-center text-2xl font-semibold text-neutral-900'
          style={{color: theme?.usernameColor}}>
          {user?.name}
        </h2>
      )}

      {user?.bio && (
        <p
          className='w-full break-before-auto text-center text-sm text-neutral-900'
          style={{color: theme?.usernameColor}}>
          {user?.bio}
        </p>
      )}
    </header>
  )
}

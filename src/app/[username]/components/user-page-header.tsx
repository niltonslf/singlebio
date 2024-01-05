import {Avatar} from '@/app/components'
import {User} from '@/models'

type UserPageHeaderProps = {
  user: User
  pageStyles: any
}

export const UserPageHeader = ({user, pageStyles}: UserPageHeaderProps) => {
  return (
    <header className='mb-5 w-full'>
      <div className='mb-4 flex w-full justify-center'>
        <Avatar
          name={user?.name ?? ''}
          pictureUrl={user?.pictureUrl}
          size={100}
        />
      </div>

      {user?.name && (
        <h2
          className='mb-2 flex items-center justify-center text-2xl font-semibold text-neutral-900'
          style={pageStyles.usernameColor}>
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

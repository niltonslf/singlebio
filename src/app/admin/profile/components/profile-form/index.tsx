import Image from 'next/image'

import {SectionCard} from '@/app/admin/components'
import {User} from '@/models'

type ProfileFormProps = {
  user: User
}

export const ProfileForm = ({user}: ProfileFormProps) => {
  return (
    <SectionCard title='Profile'>
      <div className='flex flex-row flex-wrap gap-5 '>
        <div className='flex flex-1 flex-col gap-3'>
          <input
            type='text'
            name='username'
            className='bw solid input !border-background-600'
            placeholder='Username'
            value={user?.username}
          />
          <input
            type='text'
            name='name'
            className='bw solid input !border-background-600'
            placeholder='Name'
            value={user?.name}
          />
          <textarea
            placeholder='Bio'
            name='bio'
            className='bw solid input !border-background-600'
            maxLength={100}
            wrap='soft'
            rows={2}
            value={user?.bio}
          />
        </div>
        <div className='flex h-full items-center'>
          <Image
            className='rounded-full'
            src={user?.pictureUrl || ''}
            alt='Profile picture'
            width={150}
            height={150}
          />
        </div>
      </div>
    </SectionCard>
  )
}

import {SocialIcon} from 'react-social-icons'

import {UserSocial} from '@/domain/models'

type UserPageSocialProps = {
  social: UserSocial
  pageStyles: any
}

export const UserPageSocial = ({social, pageStyles}: UserPageSocialProps) => {
  if (!social.length) return <></>

  return (
    <div className='mb-5 flex w-full flex-row justify-center '>
      {social?.map(item => {
        return (
          <div key={item.name}>
            <SocialIcon
              url={item.url}
              className='!h-10 !w-10'
              fgColor={pageStyles?.socialIconColor?.value ?? '#000'}
              bgColor='transparent'
              target='_blank'
            />
          </div>
        )
      })}
    </div>
  )
}

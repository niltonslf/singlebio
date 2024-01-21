import {SocialIcon} from 'react-social-icons'

import {SocialPage} from '@/domain/models'

type UserPageSocialProps = {
  socialPages: SocialPage[]
  pageStyles: any
}

export const UserPageSocial = ({
  socialPages,
  pageStyles,
}: UserPageSocialProps) => {
  if (!socialPages.length) return <></>

  return (
    <div className='mb-5 flex w-full flex-row justify-center '>
      {socialPages?.map(item => (
        <div key={item.name}>
          <SocialIcon
            url={item.url}
            className='user-social-icon !h-10 !w-10'
            fgColor={pageStyles?.socialIconColor?.value ?? '#000'}
            bgColor='transparent'
            target='_blank'
          />
        </div>
      ))}
    </div>
  )
}

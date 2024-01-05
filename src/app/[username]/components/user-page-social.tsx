import {SocialIcon} from 'react-social-icons'

import {UserSocial} from '@/models'

type UserPageSocialProps = {
  social: UserSocial
  pageStyles: any
}

export const UserPageSocial = ({social, pageStyles}: UserPageSocialProps) => {
  return (
    <div className='mb-5 flex w-full flex-row justify-center '>
      {Object.keys(social).map(socialName => {
        return (
          <div key={socialName}>
            {social[socialName] && (
              <SocialIcon
                url={social[socialName]}
                className='!h-10 !w-10'
                fgColor={pageStyles.socialIconColor.value}
                bgColor='transparent'
                target='_blank'
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

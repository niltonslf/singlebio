import {SocialIcon} from 'react-social-icons'

import {SocialPage, UserTheme} from '@/domain/models'

type SocialPages01Props = {
  socialPages?: SocialPage[]
  theme?: UserTheme
}

export const SocialPages01 = ({socialPages, theme}: SocialPages01Props) => {
  return (
    <>
      {socialPages && socialPages?.length > 0 && (
        <div className='mb-5 flex w-full flex-row flex-wrap justify-center '>
          {socialPages?.map(item => (
            <SocialIcon
              key={item.id}
              url={item.url}
              network={item.name}
              className='user-social-icon !h-10 !w-10'
              fgColor={theme?.socialIconColor ?? '#000'}
              bgColor='transparent'
              target='_blank'
            />
          ))}
        </div>
      )}
    </>
  )
}

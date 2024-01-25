import {SocialIcon} from 'react-social-icons'

import {SocialPage} from '@/domain/models'

type SocialPages01Props = {
  socialPages: SocialPage[]
  pageStyles: any
}

export const SocialPages01 = ({
  socialPages,
  pageStyles,
}: SocialPages01Props) => {
  return (
    <>
      {socialPages.length > 0 && (
        <div className='mb-5 flex w-full flex-row justify-center '>
          {socialPages?.map(item => (
            <div key={item.id}>
              <SocialIcon
                url={item.url}
                network={item.name}
                className='user-social-icon !h-10 !w-10'
                fgColor={pageStyles?.socialIconColor?.value ?? '#000'}
                bgColor='transparent'
                target='_blank'
              />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

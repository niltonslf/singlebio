import {Wrapper} from '@/app/[username]/themes/arch/components'
import {
  Footer01,
  GithubChart01,
  Header02,
  PageLinks01,
  SocialPages01,
} from '@/app/[username]/themes/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const ArchTheme = ({links, socialPages, user}: ThemeProps) => {
  return (
    <>
      <Wrapper user={user}>
        <Header02 user={user} />
        <SocialPages01 socialPages={socialPages} theme={user.theme} />
        <PageLinks01 links={links} user={user} />
        <GithubChart01 user={user} />
        <Footer01 />
      </Wrapper>
    </>
  )
}

ArchTheme.displayName = 'ArchTheme'

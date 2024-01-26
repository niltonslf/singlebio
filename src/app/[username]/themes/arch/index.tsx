import {Wrapper} from '@/app/[username]/themes/arch/components'
import {
  Footer01,
  GithubChart01,
  Header02,
  PageLinks01,
  SocialPages01,
} from '@/app/[username]/themes/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const ArchTheme = ({links, socialPages, user, theme}: ThemeProps) => {
  return (
    <>
      <Wrapper theme={theme}>
        <Header02 user={user} theme={theme} />
        <SocialPages01 socialPages={socialPages} theme={theme} />
        <PageLinks01 links={links} theme={theme} />
        <GithubChart01 user={user} />
        <Footer01 />
      </Wrapper>
    </>
  )
}

ArchTheme.displayName = 'ArchTheme'

import {
  Footer01,
  GithubChart01,
  Header01,
  PageLinks01,
  SocialPages01,
} from '@/app/[username]/components'
import {Wrapper} from '@/app/[username]/themes/default/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const GreenTheme = ({links, socialPages, user, theme}: ThemeProps) => {
  return (
    <>
      <Wrapper theme={theme}>
        <Header01 user={user} theme={theme} />
        <SocialPages01 theme={theme} socialPages={socialPages} />
        <PageLinks01 links={links} theme={theme} />
        <GithubChart01 user={user} />
        <Footer01 />
      </Wrapper>
    </>
  )
}

GreenTheme.displayName = 'GreenTheme'

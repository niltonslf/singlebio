import {
  Footer01,
  GithubChart01,
  Header01,
  PageLinks01,
  SocialPages01,
} from '@/app/[username]/themes/components'
import {Wrapper} from '@/app/[username]/themes/default/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const DefaultTheme = ({links, socialPages, user}: ThemeProps) => {
  return (
    <>
      <Wrapper theme={user.theme}>
        <Header01 user={user} />
        <SocialPages01 theme={user.theme} socialPages={socialPages} />
        <PageLinks01 links={links} user={user} />
        <GithubChart01 user={user} />
        <Footer01 />
      </Wrapper>
    </>
  )
}

DefaultTheme.displayName = 'DefaultTheme'

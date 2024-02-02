import {
  Footer01,
  GithubChart01,
  Header02,
  PageLinks01,
  SocialPages01,
  SpotifyEmbed01,
} from '@/app/[username]/components'
import {Wrapper} from '@/app/[username]/themes/arch/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const ArchTheme = ({
  links,
  socialPages,
  user,
  theme,
  features,
}: ThemeProps) => {
  return (
    <Wrapper theme={theme}>
      <Header02 user={user} theme={theme} />
      <SocialPages01 socialPages={socialPages} theme={theme} />
      <PageLinks01 links={links} theme={theme} />
      <SpotifyEmbed01 features={features} />
      <GithubChart01 features={features} />
      <Footer01 />
    </Wrapper>
  )
}

ArchTheme.displayName = 'ArchTheme'

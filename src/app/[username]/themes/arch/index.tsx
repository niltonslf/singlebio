import {
  Footer01,
  GithubChart01,
  Header02,
  PageLinks01,
  SocialPages01,
  SpotifyEmbed01,
} from '@/app/[username]/components'
import {loadThemeFeatures} from '@/app/[username]/config'
import {Wrapper} from '@/app/[username]/themes/arch/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const ArchTheme = (props: ThemeProps) => {
  const themeFeatures = loadThemeFeatures(props, {
    github: GithubChart01,
    pageLinks: PageLinks01,
    socialPages: SocialPages01,
    spotify: SpotifyEmbed01,
  })

  return (
    <Wrapper theme={props.theme} user={props.user}>
      <Header02 user={props.user} theme={props.theme} />

      {themeFeatures}

      <Footer01 />
    </Wrapper>
  )
}

ArchTheme.displayName = 'ArchTheme'

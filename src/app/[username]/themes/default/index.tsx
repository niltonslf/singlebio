import {
  Footer01,
  Header01,
  PageLinks01,
  SocialPages01,
} from '@/app/[username]/components'
import {loadThemeFeatures} from '@/app/[username]/config'
import {Wrapper} from '@/app/[username]/themes/default/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const DefaultTheme = (props: ThemeProps) => {
  const themeFeatures = loadThemeFeatures(props, {
    socialPages: SocialPages01,
    pageLinks: PageLinks01,
  })

  return (
    <>
      <Wrapper theme={props.theme} user={props.user}>
        <Header01 user={props.user} theme={props.theme} />
        {themeFeatures}
        <Footer01 />
      </Wrapper>
    </>
  )
}

DefaultTheme.displayName = 'DefaultTheme'

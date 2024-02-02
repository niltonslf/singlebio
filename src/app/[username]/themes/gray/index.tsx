import {Footer01, Header01} from '@/app/[username]/components'
import {loadThemeFeatures} from '@/app/[username]/config'
import {Wrapper} from '@/app/[username]/themes/default/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const GrayTheme = (props: ThemeProps) => {
  const themeFeatures = loadThemeFeatures(props, {})

  return (
    <>
      <Wrapper theme={props.theme}>
        <Header01 user={props.user} theme={props.theme} />
        {themeFeatures}
        <Footer01 />
      </Wrapper>
    </>
  )
}

GrayTheme.displayName = 'GrayTheme'

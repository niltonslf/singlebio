import {Footer01, Header01} from '@/app/[username]/components'
import {loadThemeFeatures} from '@/app/[username]/config'
import {Wrapper} from '@/app/[username]/themes/green/components'
import {ThemeProps} from '@/app/[username]/themes/types'

export const GreenTheme = (props: ThemeProps) => {
  const themeFeatures = loadThemeFeatures(props, {})

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

GreenTheme.displayName = 'GreenTheme'

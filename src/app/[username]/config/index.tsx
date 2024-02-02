import {ComponentType} from 'react'

import {Spread} from '@/@types/utils'
import {
  GithubChart01,
  PageLinks01,
  SocialPages01,
  SpotifyEmbed01,
} from '@/app/[username]/components'
import {ThemeProps} from '@/app/[username]/themes/types'
import {UserFeaturesAvailable} from '@/domain/models'

type ComponentProps = Spread<
  Partial<Record<UserFeaturesAvailable, ComponentType<ThemeProps>>>
>

export const loadThemeFeatures = (
  props: ThemeProps,
  components: ComponentProps,
) => {
  return props.features.map(feature => {
    switch (feature.id) {
      case 'pageLinks':
        return components.pageLinks ? (
          <components.pageLinks {...props} />
        ) : (
          <PageLinks01 {...props} />
        )
      case 'socialPages':
        return components.socialPages ? (
          <components.socialPages {...props} />
        ) : (
          <SocialPages01 {...props} />
        )
      case 'github':
        return components.github ? (
          <components.github {...props} />
        ) : (
          <GithubChart01 {...props} />
        )
      case 'spotify':
        return components.spotify ? (
          <components.spotify {...props} />
        ) : (
          <SpotifyEmbed01 {...props} />
        )
    }
  })
}

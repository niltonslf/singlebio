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
          <components.pageLinks {...props} key={feature.id} />
        ) : (
          <PageLinks01 {...props} key={feature.id} />
        )
      case 'socialPages':
        return components.socialPages ? (
          <components.socialPages {...props} key={feature.id} />
        ) : (
          <SocialPages01 {...props} key={feature.id} />
        )
      case 'github':
        return components.github ? (
          <components.github {...props} key={feature.id} />
        ) : (
          <GithubChart01 {...props} key={feature.id} />
        )
      case 'spotify':
        return components.spotify ? (
          <components.spotify {...props} key={feature.id} />
        ) : (
          <SpotifyEmbed01 {...props} key={feature.id} />
        )
    }
  })
}

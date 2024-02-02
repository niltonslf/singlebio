export type UserFeature = {
  id: UserFeaturesAvailable
  order: number
  value: string
}

export type UserFeaturesAvailable =
  | 'socialPages'
  | 'pageLinks'
  | 'github'
  | 'spotify'

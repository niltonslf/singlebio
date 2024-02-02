import {UserFeature, UserFeaturesAvailable} from '@/domain/models'
import {faker} from '@faker-js/faker'

export const makeFeature = (
  id?: UserFeaturesAvailable,
  value?: string,
  order?: number,
): UserFeature => {
  return {
    id: id ?? 'pageLinks',
    order: order ?? faker.number.int(),
    value: value ?? '',
  }
}

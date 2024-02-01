import {ComponentType} from 'react'

import {
  ButtonCircle,
  ButtonCircleOutline,
  ButtonDefault,
  ButtonOutline,
  ButtonSquare,
  ButtonSquareOutline,
} from '@/app/[username]/components'
import {ThemeButtonProps} from '@/app/[username]/themes/types'
import {ThemeButtonStyles} from '@/domain/models'

export type Option<T> = {
  name: string
  component: ComponentType<T>
}

export const themeButtonStyle: Record<
  ThemeButtonStyles,
  Option<ThemeButtonProps>
> = {
  'default': {
    name: 'Default',
    component: ButtonDefault,
  },
  'square': {
    name: 'Square',
    component: ButtonSquare,
  },
  'circle': {
    name: 'Circle',
    component: ButtonCircle,
  },
  'outline': {
    name: 'Outline',
    component: ButtonOutline,
  },
  'circle-outline': {
    name: 'Circle outline',
    component: ButtonCircleOutline,
  },
  'square-outline': {
    name: 'Square outline',
    component: ButtonSquareOutline,
  },
}

import {ComponentType} from 'react'

import {DefaultTheme, ArchTheme} from '@/app/[username]/themes'
import {
  ButtonCircle,
  ButtonCircleOutline,
  ButtonDefault,
  ButtonOutline,
  ButtonSquare,
  ButtonSquareOutline,
} from '@/app/[username]/themes/components'
import {ThemeButtonProps, ThemeProps} from '@/app/[username]/themes/types'
import {ThemeButtonStyles} from '@/domain/models'

export type Option<T> = {
  name: string
  component: ComponentType<T>
}
export type ThemeOptions = Record<string, Option<ThemeProps>>

export const themeOptions: ThemeOptions = {
  default: {
    name: 'Default',
    component: DefaultTheme,
  },
  arch: {
    name: 'Arch',
    component: ArchTheme,
  },
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

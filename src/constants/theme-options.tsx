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
import {ThemeButtonStyles, UserTheme} from '@/domain/models'

export type Option<T> = {
  name: string
  component: ComponentType<T>
}

export interface ThemeOption<T> extends Option<T> {
  image: string
  defaultTheme: UserTheme
}

export const themeOptions: Record<string, ThemeOption<ThemeProps>> = {
  default: {
    image: '/theme/theme-arch.png',
    name: 'default',
    component: DefaultTheme,
    defaultTheme: {
      name: 'default',
      backgroundColor: '',
      backgroundImage: '',
      buttonBackground: '',
      buttonStyle: 'default',
      buttonTextColor: '',
      socialDefaultColor: false,
      socialIconColor: '',
      usernameColor: '',
    },
  },
  arch: {
    image: '/theme/theme-arch.png',
    name: 'arch',
    component: ArchTheme,
    defaultTheme: {
      name: 'arch',
      backgroundColor: '#f9f9f9',
      backgroundImage: '',
      buttonBackground: '#333333',
      buttonStyle: 'square',
      buttonTextColor: '#FFFFFF',
      socialDefaultColor: false,
      socialIconColor: '',
      usernameColor: '',
    },
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

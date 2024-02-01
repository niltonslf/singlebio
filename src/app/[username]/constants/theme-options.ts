import {ComponentType} from 'react'

import {
  DefaultTheme,
  ArchTheme,
  GreenTheme,
  GrayTheme,
  BlueTheme,
} from '@/app/[username]/themes'
import {ThemeProps} from '@/app/[username]/themes/types'
import {UserTheme} from '@/domain/models'

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
    image: '/theme/theme-default.png',
    name: 'default',
    component: DefaultTheme,
    defaultTheme: {
      name: 'default',
      backgroundColor: '',
      backgroundImage: '',
      buttonBackground: '',
      buttonStyle: 'default',
      buttonTextColor: '#000000',
      socialDefaultColor: false,
      socialIconColor: '#000000',
      usernameColor: '#000000',
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
      buttonBackground: '#00000000',
      buttonStyle: 'square-outline',
      buttonTextColor: '#000000',
      socialDefaultColor: false,
      socialIconColor: '#000000',
      usernameColor: '#000000',
    },
  },
  gray: {
    image: '/theme/theme-gray.png',
    name: 'gray',
    component: GrayTheme,
    defaultTheme: {
      name: 'gray',
      backgroundColor: '#f2f2f2',
      backgroundImage: '',
      buttonBackground: '#FFF',
      buttonStyle: 'default',
      buttonTextColor: '#000000',
      socialDefaultColor: false,
      socialIconColor: '#000000',
      usernameColor: '#000000',
    },
  },
  blue: {
    image: '/theme/theme-blue.png',
    name: 'blue',
    component: BlueTheme,
    defaultTheme: {
      name: 'blue',
      backgroundColor: '#2d93f1',
      backgroundImage: '',
      buttonBackground: '#00427e',
      buttonStyle: 'default',
      buttonTextColor: '#f2f2f2',
      socialDefaultColor: false,
      socialIconColor: '#f2f2f2',
      usernameColor: '#f2f2f2',
    },
  },
  green: {
    image: '/theme/theme-green.png',
    name: 'green',
    component: GreenTheme,
    defaultTheme: {
      name: 'green',
      backgroundColor: '#f5fdf4',
      backgroundImage: '',
      buttonBackground: '#a6eb99',
      buttonStyle: 'circle',
      buttonTextColor: '#000000',
      socialDefaultColor: false,
      socialIconColor: '#000000',
      usernameColor: '#000000',
    },
  },
}

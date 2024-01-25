import {ComponentType} from 'react'

import {DefaultTheme, ArchTheme} from '@/app/[username]/themes'
import {ThemeProps} from '@/app/[username]/themes/types'

export type Option = {
  name: string
  component: ComponentType<ThemeProps>
}

export type ThemeOptions = Record<string, Option>

export const themeOptions: ThemeOptions = {
  default: {
    name: 'Arch',
    component: DefaultTheme,
  },
  arch: {
    name: 'Arch',
    component: ArchTheme,
  },
}

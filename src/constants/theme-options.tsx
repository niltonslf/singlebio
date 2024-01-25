import {ComponentType} from 'react'

import {ArchTheme, DefaultTheme} from '@/app/[username]/components/themes'
import {ThemeProps} from '@/app/[username]/components/themes/types'

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

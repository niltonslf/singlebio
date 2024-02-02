import {LucideIcon} from 'lucide-react'
import {HTMLAttributes, ComponentType} from 'react'

import {User, UserFeature} from '@/domain/models'

export type Feature = {
  id: string
  title: string
  Icon: LucideIcon
  iconClass?: HTMLAttributes<HTMLElement>['className']
  Component: ComponentType<{user: User}>
}

export interface ActiveFeature extends Feature, UserFeature {}

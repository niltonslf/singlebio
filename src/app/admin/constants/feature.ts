import {Link2, Share2, Github, AudioLines, LucideIcon} from 'lucide-react'
import {ComponentType} from 'react'

import {
  SocialPagesSection,
  GithubSection,
  SpotifySection,
  LinksSection,
} from '@/app/admin/components'
import {User} from '@/domain/models'

interface FeatureOption {
  id: string
  title: string
  Icon: LucideIcon
  iconClass: string
  Component: ComponentType<{user: User}>
}
type FeatureOptionsObject = Record<string, FeatureOption>

export const featureOptions: FeatureOption[] = [
  {
    id: 'pageLinks',
    title: 'Links',
    Icon: Link2,
    iconClass: 'bg-blue-600',
    Component: LinksSection,
  },
  {
    id: 'socialPages',
    title: 'Social',
    Icon: Share2,
    iconClass: 'bg-pink-600',
    Component: SocialPagesSection,
  },
  {
    id: 'github',
    title: 'Github',
    Icon: Github,
    iconClass: 'bg-gray-600',
    Component: GithubSection,
  },
  {
    id: 'spotify',
    title: 'Spotify',
    Icon: AudioLines,
    iconClass: 'bg-green-600',
    Component: SpotifySection,
  },
]

export const featureOptionsObject = featureOptions.reduce((acc, curr) => {
  acc[curr.id] = curr
  return acc
}, {} as FeatureOptionsObject)

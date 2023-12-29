import {CircleDashed, Instagram, Phone} from 'lucide-react'
import React, {ReactElement} from 'react'

export type SocialOption = {
  icon: ReactElement
  label: string
}

export type SocialOptions = Record<string, SocialOption>

export const socialOptions: SocialOptions = {
  instagram: {
    icon: <Instagram />,
    label: 'Instagram',
  },
  reddit: {
    icon: <CircleDashed />,
    label: 'Reddit',
  },
  whatsapp: {
    icon: <Phone />,
    label: 'Whatsapp',
  },
}

'use client'

import {ChevronsUpDown, Minus} from 'lucide-react'

import {Collapse} from '@/app/admin/components'
import {featureOptionsObject} from '@/app/admin/constants'
import {User, UserFeature} from '@/domain/models'
import {merge} from '@/utils'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

type FeatureActiveItemProps = {
  feature: UserFeature
  user: User
  index: number
  onDisable: (featId: string) => void
}

export const FeatureActiveItem = ({
  onDisable,
  feature,
  user,
  index,
}: FeatureActiveItemProps) => {
  const {attributes, listeners, setNodeRef, transform, transition} =
    useSortable({id: feature.id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const {Component, Icon, iconClass, title} = featureOptionsObject[feature.id]

  return (
    <div ref={setNodeRef} style={style}>
      <Collapse.Item index={index}>
        <Collapse.Header>
          <div className='flex w-full items-center gap-3'>
            <div
              {...attributes}
              {...listeners}
              className={merge([
                'touch-none rounded-md p-2 hover:bg-base-200',
              ])}>
              <ChevronsUpDown size={18} />
            </div>
            <div className={merge(['rounded-md bg-gray-600 p-2', iconClass])}>
              <Icon size={15} />
            </div>
            {title}
            <div
              onClick={e => {
                e.stopPropagation()
                onDisable(feature.id)
              }}
              className={merge(['ml-auto rounded-md p-2 hover:bg-base-200'])}>
              <Minus size={18} />
            </div>
          </div>
        </Collapse.Header>
        <Collapse.Body>
          <Component user={user} />
        </Collapse.Body>
      </Collapse.Item>
    </div>
  )
}

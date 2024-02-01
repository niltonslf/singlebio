import {ChevronsUpDown, Minus} from 'lucide-react'

import {Collapse} from '@/app/admin/components'
import {User} from '@/domain/models'
import {ActiveFeature} from '@/domain/utility'
import {merge} from '@/utils'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

type FeatureActiveItemProps = {
  feature: ActiveFeature
  user: User
  index: number
  onDisable: (feature: ActiveFeature) => void
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

  return (
    <div ref={setNodeRef} style={style}>
      <Collapse.Item index={index}>
        <Collapse.Header>
          <div className='flex w-full items-center gap-3'>
            <div
              {...attributes}
              {...listeners}
              className={merge(['rounded-md p-2 hover:bg-base-200'])}>
              <ChevronsUpDown size={18} />
            </div>
            <div
              className={merge([
                'rounded-md bg-gray-600 p-2',
                feature.iconClass,
              ])}>
              <feature.Icon size={15} />
            </div>
            {feature.title} [{feature.order}]
            <div
              onClick={() => onDisable(feature)}
              className={merge(['ml-auto rounded-md p-2 hover:bg-base-200'])}>
              <Minus size={18} />
            </div>
          </div>
        </Collapse.Header>
        <Collapse.Body>
          <feature.Component user={user} />
        </Collapse.Body>
      </Collapse.Item>
    </div>
  )
}

import {ReactNode} from 'react'

import {UserFeature} from '@/domain/models'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type FeaturesDragAndDropProps = {
  children?: ReactNode
  items: UserFeature[]
}

export const FeaturesDragAndDrop = ({
  children,
  items,
}: FeaturesDragAndDropProps) => {
  const sensors = useSensors(useSensor(PointerSensor))

  // const handleUpdateFeature = async (feature: ActiveFeature) => {
  //   const newFeature: UserFeatures = {
  //     ...user?.features,
  //     [feature.id]: {
  //       ...user?.features?.[feature.id],
  //       order: feature.order,
  //     },
  //   }

  //   await adminStore.updateUser({features: newFeature})
  // }

  const updateSort = (
    items: UserFeature[],
    oldIndex: number,
    newIndex: number,
  ) => {
    // MOVING DOWN
    if (oldIndex < newIndex) {
      // console.log(oldIndex, newIndex)

      // const [start, end] = [oldIndex, newIndex - 1]

      // handleUpdateFeature({...items[newIndex], order: items[end].order})

      // for (let index = start; index <= end; index++) {
      //   const feature: ActiveFeature = {
      //     ...items[index],
      //     order: items[index].order - 1,
      //   }
      //   handleUpdateFeature(feature)
      // }

      return
    }

    // // MOVING UP
    // const [start, end] = [newIndex + 1, oldIndex]
    // handleUpdateFeature({...items[newIndex], order: items[start].order})

    // for (let index = start; index <= end; index++) {
    //   const feature: ActiveFeature = {
    //     ...items[index],
    //     order: items[index].order +1,
    //   }
    //   handleUpdateFeature(feature)
    // }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event

    if (active.id != over?.id) {
      const oldIndex = items.findIndex(item => item.id == active.id)
      const newIndex = items.findIndex(item => item.id == over?.id)
      const newArr = arrayMove(items, oldIndex, newIndex)
      updateSort(newArr, oldIndex, newIndex)

      // update store
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={items}
        key='feature-list'
        strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

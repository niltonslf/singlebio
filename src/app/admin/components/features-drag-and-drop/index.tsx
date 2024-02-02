'use client'

import {ReactNode} from 'react'

import {adminStore} from '@/app/admin/context/admin-store'
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

  const updateSort = async (
    items: UserFeature[],
    oldIndex: number,
    newIndex: number,
  ) => {
    // MOVING DOWN
    if (oldIndex < newIndex) {
      const [start, end] = [oldIndex, newIndex - 1]

      await adminStore.insertFeature({
        ...items[newIndex],
        order: items[end].order,
      })

      for (let index = start; index <= end; index++) {
        const feature = {...items[index], order: items[index].order - 1}
        await adminStore.insertFeature(feature)
      }
      return
    }

    // MOVING UP
    const [start, end] = [newIndex + 1, oldIndex]
    await adminStore.insertFeature({
      ...items[newIndex],
      order: items[start].order,
    })

    for (let index = start; index <= end; index++) {
      const feature = {...items[index], order: items[index].order + 1}
      await adminStore.insertFeature(feature)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const {active, over} = event

    if (active.id != over?.id) {
      const oldIndex = items.findIndex(item => item.id == active.id)
      const newIndex = items.findIndex(item => item.id == over?.id)
      const newArr = arrayMove(items, oldIndex, newIndex)

      adminStore.setFeatures(newArr)
      await updateSort(newArr, oldIndex, newIndex)
      await adminStore.reloadFeatures()
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

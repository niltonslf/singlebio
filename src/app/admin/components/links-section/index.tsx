'use client'

import {collection, deleteDoc, doc, addDoc, setDoc} from 'firebase/firestore'
import {Info, Plus} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {adminStore} from '@/app/admin/context/admin-store'
import {Link, LinkCreation, User} from '@/domain/models'
import {db} from '@/services/firebase'

import {AddLinkForm} from '..'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import {CardLink} from './components/card-link'

type CardListProps = {
  user: User
}

export const LinksSection = observer(({user}: CardListProps) => {
  const {pageLinks} = adminStore

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const getLastOrder = () => {
    return pageLinks.reduce((prev, cur) => Math.max(prev, cur.order + 1), 0)
  }

  const handleAddNewLink = async () => {
    const res = await doc(db, 'users', user.uid)
    const emptyLink: LinkCreation = {
      label: '',
      url: '',
      clicks: 0,
      order: getLastOrder(),
    }
    addDoc(collection(res, 'links'), emptyLink)
  }

  const handleSaveLink = async (data: Link) => {
    if (data.id)
      return setDoc(doc(db, 'users', user.uid, 'links', data.id), data)
  }

  const handleSubmitForm = async (data: Link) => {
    await handleSaveLink(data)
  }

  const deleteLink = async (link: Link) => {
    if (link.id) {
      await deleteDoc(doc(db, 'users', user.uid, 'links', link.id))
    }
  }

  const updateSort = (
    links: Required<Link>[],
    oldIndex: number,
    newIndex: number,
  ): void => {
    // MOVING DOWN
    if (oldIndex < newIndex) {
      const [start, end] = [oldIndex, newIndex - 1]

      handleSaveLink({...links[newIndex], order: links[end].order})

      for (let index = start; index <= end; index++) {
        const link: Link = {...links[index], order: links[index].order + 1}
        handleSaveLink(link)
      }
    }

    // MOVING UP
    const [start, end] = [newIndex + 1, oldIndex]

    handleSaveLink({...links[newIndex], order: links[start].order})

    for (let index = start; index <= end; index++) {
      const link: Link = {...links[index], order: links[index].order - 1}
      handleSaveLink(link)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event

    if (active.id != over?.id) {
      const oldIndex = pageLinks.findIndex(item => item.id == active.id)
      const newIndex = pageLinks.findIndex(item => item.id == over?.id)
      const newArr = arrayMove(pageLinks, oldIndex, newIndex)

      updateSort(newArr, oldIndex, newIndex)
      adminStore.setPageLinks(newArr)
    }
  }

  return (
    <section className='flex w-full flex-col gap-5 px-0 py-3'>
      <div className='flex flex-1 flex-col gap-5'>
        <div className='mb-10 flex w-full flex-1 flex-row flex-wrap gap-10'>
          <button
            onClick={handleAddNewLink}
            className='btn btn-primary flex-1 text-sm uppercase text-neutral-100'>
            <Plus size={18} />
            Add link
          </button>
        </div>

        <ul className='flex flex-1 flex-col gap-3'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <SortableContext
              items={pageLinks}
              key='links-list'
              strategy={verticalListSortingStrategy}>
              {pageLinks.map(link => (
                <CardLink key={link.id} onDelete={deleteLink} link={link}>
                  <AddLinkForm saveLink={handleSubmitForm} link={link} />
                </CardLink>
              ))}
            </SortableContext>
          </DndContext>
        </ul>

        {!pageLinks.length && (
          <div className='alert alert-info'>
            <Info />
            <p className='content'>It's time to create your first link!</p>
          </div>
        )}
      </div>
    </section>
  )
})

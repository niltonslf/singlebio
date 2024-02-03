'use client'

import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {Info, Plus} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {CardLink} from '@/app/admin/components/links-section/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {PageLink, LinkCreation, User} from '@/domain/models'
import {db} from '@/services/firebase'

import {AddLinkForm} from '..'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type CardListProps = {
  user: User
}

export const LinksSection = observer(({user}: CardListProps) => {
  const {pageLinks} = adminStore

  const sensors = useSensors(useSensor(PointerSensor))

  const getLastOrder = () => {
    return pageLinks.reduce((prev, cur) => Math.max(prev, cur.order + 1), 0)
  }

  const handleAddNewLink = async () => {
    const res = await doc(db, 'users', user.uid)
    const emptyLink: LinkCreation = {label: '', url: '', order: getLastOrder()}
    const docRef = await addDoc(collection(res, 'links'), emptyLink)
    await updateDoc(docRef, {id: docRef.id})
    adminStore.reloadPageLinks()
  }

  const handleSaveLink = async (data: PageLink) => {
    await setDoc(doc(db, 'users', user.uid, 'links', data.id), data)
  }

  const deleteLink = async (link: PageLink) => {
    await deleteDoc(doc(db, 'users', user.uid, 'links', link.id))
    adminStore.reloadPageLinks()
  }

  const updateSort = async (
    links: PageLink[],
    oldIndex: number,
    newIndex: number,
  ) => {
    // MOVING DOWN
    if (oldIndex < newIndex) {
      const [start, end] = [oldIndex, newIndex - 1]

      await handleSaveLink({...links[newIndex], order: links[end].order})

      for (let index = start; index <= end; index++) {
        const link = {...links[index], order: links[index].order - 1}
        await handleSaveLink(link)
      }
      return
    }

    // MOVING UP
    const [start, end] = [newIndex + 1, oldIndex]
    await handleSaveLink({...links[newIndex], order: links[start].order})

    for (let index = start; index <= end; index++) {
      const link = {...links[index], order: links[index].order + 1}
      await handleSaveLink(link)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const {active, over} = event

    if (active.id != over?.id) {
      const oldIndex = pageLinks.findIndex(item => item.id == active.id)
      const newIndex = pageLinks.findIndex(item => item.id == over?.id)
      const newArr = arrayMove(pageLinks, oldIndex, newIndex)

      adminStore.setPageLinks(newArr)
      await updateSort(newArr, oldIndex, newIndex)
      await adminStore.reloadPageLinks()
    }
  }

  return (
    <section className='flex w-full flex-col px-0 py-3'>
      <div className='flex flex-1 flex-col gap-5'>
        {pageLinks.length > 0 && (
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
                    <AddLinkForm
                      saveLink={async data => {
                        handleSaveLink(data)
                        await adminStore.reloadPageLinks()
                      }}
                      link={link}
                    />
                  </CardLink>
                ))}
              </SortableContext>
            </DndContext>
          </ul>
        )}

        <div className='flex w-full flex-1 flex-row flex-wrap gap-10'>
          <button
            onClick={handleAddNewLink}
            className='btn btn-primary flex-1 text-sm uppercase text-neutral-100'>
            <Plus size={18} />
            Add link
          </button>
        </div>

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

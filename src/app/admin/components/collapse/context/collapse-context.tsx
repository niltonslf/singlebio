import {PropsWithChildren, createContext, useContext, useState} from 'react'

import {Spread} from '@/@types/utils'

type CollapseContextProps = {
  isItemOpen: (index: number) => boolean
  setItemIndex: (index: number) => void
  handleToggleItem: (index: number) => void
  onOpen?: (index: number) => void
  onClose?: (index: number) => void
}

type CollapseProviderProps = Spread<
  PropsWithChildren & {
    defaultOpen?: boolean
    onOpen?: (index: number) => void
    onClose?: (index: number) => void
  }
>

type Items = Record<string, boolean>

const initialState = {} as CollapseContextProps
const CollapseContext = createContext<CollapseContextProps>(initialState)
CollapseContext.displayName = 'CollapseContext'

export const CollapseProvider = ({
  children,
  defaultOpen = false,
  onClose,
  onOpen,
}: CollapseProviderProps) => {
  const [items, setItems] = useState<Items>({})

  const setItemIndex = (index: number) => {
    setItems(prev => ({...prev, [index]: false}))
  }

  const handleToggleItem = (index: number) => {
    const currentStatus = items[index]
    setItems(prev => ({...prev, [index]: !currentStatus}))
  }

  const isItemOpen = (index: number) => items[index]

  return (
    <CollapseContext.Provider
      value={{isItemOpen, handleToggleItem, onClose, onOpen, setItemIndex}}>
      {children}
    </CollapseContext.Provider>
  )
}

export const useCollapse = () => useContext(CollapseContext)

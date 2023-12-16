import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

import {Spread} from '@/@types/utils'

type CollapseContextProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
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

const initialState = {} as CollapseContextProps
const CollapseContext = createContext<CollapseContextProps>(initialState)

export const CollapseProvider = ({
  children,
  defaultOpen = false,
  onClose,
  onOpen,
}: CollapseProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

  return (
    <CollapseContext.Provider value={{isOpen, setIsOpen, onClose, onOpen}}>
      {children}
    </CollapseContext.Provider>
  )
}

export const useCollapse = () => {
  const {...ctx} = useContext<CollapseContextProps>(CollapseContext)

  return {
    ...ctx,
  }
}

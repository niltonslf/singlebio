import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type CollapseItemContextProps = {
  itemIndex: number
  setItemIndex: Dispatch<SetStateAction<number>>
}

type CollapseItemProviderProps = {
  index: number
  children?: ReactNode
}

const initialState = {} as CollapseItemContextProps
const CollapseItemContext =
  createContext<CollapseItemContextProps>(initialState)
CollapseItemContext.displayName = 'CollapseItemContext'

export const CollapseItemProvider = ({
  children,
  index,
}: CollapseItemProviderProps) => {
  const [itemIndex, setItemIndex] = useState(index)

  return (
    <CollapseItemContext.Provider value={{itemIndex, setItemIndex}}>
      {children}
    </CollapseItemContext.Provider>
  )
}

export const useCollapseItem = () => useContext(CollapseItemContext)

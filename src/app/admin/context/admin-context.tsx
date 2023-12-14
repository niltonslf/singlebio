import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type AdminContextProps = {
  setSmartphoneRef: Dispatch<
    SetStateAction<RefObject<HTMLIFrameElement> | undefined>
  >
  reloadSmartphoneList: () => void
}

const adminContext = createContext<AdminContextProps>({} as AdminContextProps)

export const AdminProvider = ({children}: PropsWithChildren) => {
  const [smartphoneRef, setSmartphoneRef] =
    useState<RefObject<HTMLIFrameElement>>()

  const reloadSmartphoneList = () => {
    if (!smartphoneRef?.current) return

    smartphoneRef.current?.contentWindow?.location.reload()
  }

  return (
    <adminContext.Provider value={{reloadSmartphoneList, setSmartphoneRef}}>
      {children}
    </adminContext.Provider>
  )
}

export const useAdmin = () => ({...useContext(adminContext)})

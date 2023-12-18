import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

type AdminContextProps = {
  setSmartphoneRef: Dispatch<
    SetStateAction<RefObject<HTMLIFrameElement> | undefined>
  >
  reloadSmartphoneList: () => void
  updateSmartphoneSrc: (src: string) => void
}

const adminContext = createContext<AdminContextProps>({} as AdminContextProps)

export const AdminProvider = ({children}: PropsWithChildren) => {
  const [smartphoneRef, setSmartphoneRef] =
    useState<RefObject<HTMLIFrameElement>>()

  const reloadSmartphoneList = useCallback(() => {
    if (!smartphoneRef?.current) return
    smartphoneRef.current?.contentWindow?.location.reload()
  }, [smartphoneRef])

  const updateSmartphoneSrc = useCallback(
    (src: string) => {
      smartphoneRef?.current?.setAttribute('src', src)
    },
    [smartphoneRef],
  )

  return (
    <adminContext.Provider
      value={{
        reloadSmartphoneList,
        setSmartphoneRef,
        updateSmartphoneSrc,
      }}>
      {children}
    </adminContext.Provider>
  )
}

export const useAdmin = () => ({...useContext(adminContext)})

import {
  PropsWithChildren,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react'

type SmartphoneContext = {
  reloadSmartphoneList: () => void
  iframeRef: RefObject<HTMLIFrameElement>
}

const initialData = {} as SmartphoneContext
const smartphoneContext = createContext<SmartphoneContext>(initialData)

export const SmartphoneProvider = ({children}: PropsWithChildren) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const reloadSmartphoneList = useCallback(() => {
    const path = iframeRef?.current?.contentWindow?.location.pathname
    const uniquePath = `${path}?id=${Date.now()}`

    iframeRef?.current?.setAttribute('src', uniquePath)
  }, [iframeRef])

  return (
    <smartphoneContext.Provider
      value={{
        reloadSmartphoneList,
        iframeRef,
      }}>
      {children}
    </smartphoneContext.Provider>
  )
}

export const useSmartphone = () => ({...useContext(smartphoneContext)})

import {
  PropsWithChildren,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

type SmartphoneContext = {
  reloadSmartphoneList: () => void
  iframeRef: RefObject<HTMLIFrameElement>
  key: number
}

const initialData = {} as SmartphoneContext
const smartphoneContext = createContext<SmartphoneContext>(initialData)

export const SmartphoneProvider = ({children}: PropsWithChildren) => {
  const [key, setKey] = useState(Date.now())
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const reloadSmartphoneList = useCallback(() => {
    setKey(Date.now())
  }, [])

  return (
    <smartphoneContext.Provider
      value={{
        reloadSmartphoneList,
        iframeRef,
        key,
      }}>
      {children}
    </smartphoneContext.Provider>
  )
}

export const useSmartphone = () => ({...useContext(smartphoneContext)})

import {ReactNode} from 'react'

type InputErrorMsgProps = {
  children: ReactNode
}

export const InputErrorMsg = ({children}: InputErrorMsgProps) => {
  return <p className='ml-1 mt-1 text-sm text-error'>{children}</p>
}

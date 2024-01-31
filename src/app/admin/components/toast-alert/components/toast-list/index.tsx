import {observer} from 'mobx-react-lite'
import {ReactNode} from 'react'

import {Toast, toastAlertStore} from '@/app/admin/components'

type ToastListProps = {
  children?: ReactNode
}

export const ToastList = observer(({}: ToastListProps) => {
  const {toasts} = toastAlertStore

  return (
    <div className='toast toast-center z-50'>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          closeToast={id => toastAlertStore.removeToast(id)}
        />
      ))}
    </div>
  )
})

import {X} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {ToastItem} from '@/app/admin/components'
import {merge} from '@/utils'

type ToastProps = {
  toast: ToastItem
  closeToast: (id: number) => void
}

export const Toast = observer(({toast, closeToast}: ToastProps) => {
  return (
    <div
      role='alert'
      className={merge([
        'alert text-base-content shadow-md shadow-base-300',
        toast.type === 'default' ? 'bg-base-200' : `alert-${toast.type}`,
      ])}>
      <div>
        <h3>{toast.title}</h3>
        {toast.message && <div className='text-xs'>{toast.message}</div>}
      </div>
      <button
        className='btn btn-ghost btn-sm'
        onClick={() => closeToast(toast.id)}>
        <X size={13} />
      </button>
    </div>
  )
})

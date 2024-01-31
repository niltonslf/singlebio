import {makeAutoObservable} from 'mobx'

export type ToastItem = {
  id: number
  title: string
  message?: string
  type: 'default' | 'success' | 'error' | 'warning' | 'info'
}

class ToastAlertStore {
  constructor() {
    makeAutoObservable(this)
  }

  public autoCloseDuration = 3000
  public toasts: ToastItem[] = []

  public show(toast: Omit<ToastItem, 'id'>) {
    const id = Date.now()
    this.toasts.push({id, ...toast})

    setTimeout(() => {
      this.removeToast(id)
    }, this.autoCloseDuration)
  }

  public removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id != id)
  }
}

export const toastAlertStore = new ToastAlertStore()

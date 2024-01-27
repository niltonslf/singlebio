'use client'

import {observer} from 'mobx-react-lite'
import {ReactNode, useEffect} from 'react'

import {PageLoader, Sidebar} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {useValidateAuth} from '@/app/admin/hooks'
import {merge} from '@/utils'

type Props = {
  children: ReactNode
}

const AdminLayoutWrapper = observer(({children}: Props) => {
  const {isFetchingUser} = useValidateAuth()

  useEffect(() => {
    if (!isFetchingUser) {
      adminStore.fetchData()
    }
  }, [isFetchingUser])

  if (isFetchingUser)
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <PageLoader />
      </div>
    )

  return (
    <main
      className={merge([
        'flex h-screen w-screen flex-row flex-nowrap items-center',
        'relative bg-base-100',
      ])}>
      <div className={merge(['flex h-screen'])}>
        <Sidebar />
      </div>

      <div className='h-full w-full gap-5 overflow-y-auto pb-16 pl-5 pr-5 pt-0 md:py-0 md:pl-5 md:pr-0'>
        {children}
      </div>
    </main>
  )
})

export default AdminLayoutWrapper

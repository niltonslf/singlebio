'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useRef} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'

import {Collapse, Layout} from '../components'
import {useAdmin} from '../context/admin-context'

type AppearancePageProps = {
  any?: any
}

const AppearancePage = observer(({}: AppearancePageProps) => {
  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef} = useAdmin()

  useEffect(() => {
    setSmartphoneRef(iframe)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframe])

  return (
    <Layout>
      <Layout.Content>
        <Collapse isOpen={true}>
          <Collapse.Item key={'wallpaper'} index={1}>
            <Collapse.Header>Page wallpaper</Collapse.Header>
            <Collapse.Body>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                tempora aut assumenda pariatur et natus ex suscipit sit totam
                veniam nobis ut harum cum iure, dignissimos accusantium ratione
                sapiente quidem.
              </p>
            </Collapse.Body>
          </Collapse.Item>

          <Collapse.Item key={'button-collor'} index={2}>
            <Collapse.Header>Button Collor</Collapse.Header>
            <Collapse.Body>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                tempora aut assumenda pariatur et natus ex suscipit sit totam
                veniam nobis ut harum cum iure, dignissimos accusantium ratione
                sapiente quidem.
              </p>
            </Collapse.Body>
          </Collapse.Item>
        </Collapse>
      </Layout.Content>

      <Layout.Sidebar>
        <div className='sticky top-6'>
          {authStore?.user?.userName && (
            <Smartphone
              ref={iframe}
              iframeUrl={`${authStore?.user?.userName}`}
            />
          )}
        </div>
      </Layout.Sidebar>
    </Layout>
  )
})

export default AppearancePage

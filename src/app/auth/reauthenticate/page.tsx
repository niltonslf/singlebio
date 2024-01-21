'use client'

import {observer} from 'mobx-react-lite'
import {useState} from 'react'

import {Appear} from '@/app/components'
import {LoginWithEmailAndPassword} from '@/domain/models'
import {auth} from '@/services/firebase'

import {LoginEmailPasswordForm} from '../components'
import {authStore} from '../context/auth-store'

const ReauthenticatePage = observer(() => {
  const [error, setError] = useState('')

  const handleSubmit = async (data: LoginWithEmailAndPassword) => {
    try {
      await authStore.reauthenticateWithEmailAndPassword(
        data.email,
        data.password,
        auth.currentUser,
      )
      window.close()
    } catch (error) {
      setError(error as string)
    }
  }

  return (
    <div>
      <LoginEmailPasswordForm onSubmit={handleSubmit} />

      <Appear isOpen={!!error} onClose={() => setError('')}>
        <p data-testid='error-msg' className='alert alert-error mt-5'>
          {error}
        </p>
      </Appear>
    </div>
  )
})
export default ReauthenticatePage

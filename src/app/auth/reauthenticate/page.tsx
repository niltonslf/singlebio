'use client'

import {LoginWithEmailAndPassword} from '@/domain/models'

import {LoginEmailPasswordForm} from '../components'
import {authStore} from '../context/auth-store'

const ReauthenticatePage = () => {
  const handleSubmit = async (data: LoginWithEmailAndPassword) => {
    await authStore.reauthenticateWithEmailAndPassword(
      data.email,
      data.password,
    )
    window.close()
  }

  return (
    <div>
      <LoginEmailPasswordForm onSubmit={handleSubmit} />
    </div>
  )
}

export default ReauthenticatePage

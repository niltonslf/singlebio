'use client'

import {AlertTriangle} from 'lucide-react'
import {useEffect} from 'react'

import {authStore} from '../context/auth-store'

const VerifyEmailPage = () => {
  useEffect(() => {
    authStore.logout()
  }, [])

  return (
    <div className='alert alert-warning'>
      <AlertTriangle />
      <p>Please, check your inbox in order to verify your email.</p>
    </div>
  )
}

export default VerifyEmailPage

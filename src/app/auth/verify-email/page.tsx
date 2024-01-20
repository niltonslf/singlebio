'use client'

import {AlertTriangle} from 'lucide-react'
import Link from 'next/link'
import {useEffect} from 'react'

import {authStore} from '../context/auth-store'

const VerifyEmailPage = () => {
  useEffect(() => {
    authStore.logout()
  }, [])

  return (
    <>
      <div className='alert alert-warning'>
        <AlertTriangle />
        <p>Please, check your inbox in order to verify your email.</p>
      </div>
      <Link href='/auth' className='btn btn-primary mt-5'>
        Go back
      </Link>
    </>
  )
}

export default VerifyEmailPage

'use client'

import {signInWithPopup} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {provider, auth, db} from '@/libs/firebase'

import {User} from '../../models'
import {GoogleIcon} from '../components'
import {authState} from './context/auth-state'

const SignIn = observer(() => {
  const router = useRouter()

  const [error, setError] = useState(false)

  const handlePersistUser = async (user: User) => {
    return await setDoc(doc(db, 'users', user.uid), user)
  }

  const handleLoginWithGoogle = async () => {
    try {
      const {user} = await signInWithPopup(auth, provider)
      const newUser = authState.authUser(user)

      try {
        await handlePersistUser(newUser)
      } catch (error) {
        authState.cleanUser()
        throw error
      }

      router.push('/admin')
    } catch (error: any) {
      setError(true)
    }
  }

  return (
    <div className='h-[100vh] w-[100vw]'>
      <main className='m-auto flex h-full w-full items-center justify-center bg-slate-300'>
        <div className='flex w-[400px] max-w-full flex-col rounded-md bg-white p-4 shadow-md'>
          <h1 className='mb-4 text-lg font-semibold'>SignIn</h1>

          <button
            onClick={handleLoginWithGoogle}
            type='button'
            className='dark:focus:ring-[#4285F4]/55 mb-2  mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50'>
            <GoogleIcon />
            Sign up with Google
          </button>

          {error && (
            <div className='rounded-md bg-red-200 p-2 text-sm '>
              There was an error to access your account. Please, try again later
              or use a different account.
            </div>
          )}
        </div>
      </main>
    </div>
  )
})

export default SignIn

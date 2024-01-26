'use server'

import {NextRequest, NextResponse} from 'next/server'

import {firebaseAuthAdmin} from '@/services/firebase-admin'

export const POST = async (request: NextRequest) => {
  const data = await request.json()
  const expiresIn = 60 * 60 * 1000 //1h

  const sessionCookie = await firebaseAuthAdmin.createSessionCookie(
    data.idToken,
    {expiresIn},
  )
  const options = {maxAge: expiresIn, httpOnly: true, secure: true}

  const response = NextResponse.json({defined: true}, {status: 200})
  response.cookies.set('session', sessionCookie, options)

  return response
}

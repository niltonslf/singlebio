'use server'

import {NextRequest, NextResponse} from 'next/server'

import {firebaseAuthAdmin} from '@/services/firebase-admin'

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json()
    await firebaseAuthAdmin.verifySessionCookie(data.sessionCookie)
    return NextResponse.json({isValid: true}, {status: 200})
  } catch (error) {
    return NextResponse.json({isValid: false}, {status: 401})
  }
}

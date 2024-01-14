'use client'

import {Info} from 'lucide-react'
import {CookieConsent} from 'react-cookie-consent'

import {COOKIES_CONSENT_KEY} from '@/config/envs'

export const CookieConsentBanner = () => {
  return (
    <CookieConsent
      flipButtons
      location='bottom'
      buttonText='ACCEPT COOKIES'
      cookieName={COOKIES_CONSENT_KEY}
      disableStyles
      containerClasses='w-full px-10 py-5 bg-base-300 flex justify-between fixed left-0 bottom-0 items-center'
      buttonClasses='btn btn-outline text-xs border-info text-white '
      enableDeclineButton
      declineButtonText='DECLINE COOKIES'
      declineButtonClasses='btn btn-outline text-xs ml-5'>
      <p className='flex gap-2'>
        <Info />
        We use cookies to analyze our traffic.
      </p>
    </CookieConsent>
  )
}

'use client'

import {CookieConsent} from 'react-cookie-consent'

import {COOKIES_CONSENT_KEY} from '@/config/envs'

export const CookieConsentBanner = () => {
  return (
    <CookieConsent
      flipButtons
      location='bottom'
      cookieName={COOKIES_CONSENT_KEY}
      disableStyles
      containerClasses='w-full px-5 py-5 bg-base-300 flex md:flex-row flex-col justify-between fixed left-0 bottom-0 items-center gap-5 drop-shadow-2xl '
      enableDeclineButton
      buttonText='ACCEPT COOKIES'
      buttonWrapperClasses='flex gap-5 flex-col md:flex-row w-full md:w-auto'
      buttonClasses='btn btn-outline border-info text-xs w-full md:w-auto hover:bg-base-200 hover:text-base-300'
      declineButtonText='DECLINE COOKIES'
      declineButtonClasses='btn btn-outline border-error text-xs w-full md:w-auto'
      contentClasses='flex-1 '>
      <p className='text-sm'>
        This website employs cookies for performance, analytics, and
        personalization purposes, assisting us in enhancing our site and
        delivering tailored content to you. You can opt to "Accept" the
        utilization of all cookies or "Reject" them, allowing only strictly
        necessary cookies.
      </p>
    </CookieConsent>
  )
}

import {ReactNode} from 'react'

import {CheckIcon} from '..'

type ToastProps = {
  children: ReactNode
}

export const Toast = ({children}: ToastProps) => {
  return (
    <div
      id='toast-success'
      className='dark:-bg-gray-800 dark:-text-gray-400 mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow'
      role='alert'>
      <div className='dark:-bg-green-800 dark:-text-green-200 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500'>
        <CheckIcon />
        <span className='sr-only'>Check icon</span>
      </div>
      <div className='ms-3 text-sm font-normal'>{children}.</div>
      <button
        type='button'
        className='dark:-bg-gray-800 dark:-text-gray-500 dark:-hover:bg-gray-700 dark:-hover:text-white -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300'
        data-dismiss-target='#toast-success'
        aria-label='Close'>
        <span className='sr-only'>Close</span>
        <svg
          className='h-3 w-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 14'>
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
          />
        </svg>
      </button>
    </div>
  )
}

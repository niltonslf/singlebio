'use client'

import {Send} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import {AdminBaseLayout, SectionCard} from '../components'

const Help = observer(() => {
  const supportMail = process.env.NEXT_PUBLIC_SUPPORT_MAIL

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content className='mr-5'>
        <h1 className='mb-8 text-2xl font-semibold'>Help</h1>

        <SectionCard title='Get in touch'>
          <div className='card bg-base-100 shadow-xl md:card-side'>
            <figure>
              <Image
                src='/me.png'
                alt='The developer'
                width={350}
                height={350}
                className='h-full w-full object-cover'
              />
            </figure>
            <div className='card-body w-full md:w-2/3'>
              <h2 className='card-title'>Hello there!</h2>
              <p>
                If you're facing trouble with your account, need some help, or
                need assistance with anything else, you can email me, and I will
                come back to you as soon as possible.
              </p>
              <div className='card-actions mt-10 justify-end'>
                <Link
                  href={`mailto:${supportMail}`}
                  className='btn btn-primary btn-block'>
                  <Send size={18} />
                  Send an email
                </Link>
                <p className='mt-5 text-xs'>
                  In the case the button doesn't work, this is the email
                  address: <span className='text-primary'>{supportMail}</span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </AdminBaseLayout.Content>
    </AdminBaseLayout>
  )
})

export default Help

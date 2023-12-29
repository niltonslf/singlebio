import {Instagram, Mail, Plus, Trash} from 'lucide-react'
import {useState} from 'react'

import {User} from '@/models'

import {AddSocialModalForm} from './components'

type SocialFormProps = {
  user?: User
}

export const SocialForm = ({}: SocialFormProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <div className='mt-5 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
      <div className='mb-5 flex items-baseline'>
        <h3 className='text-xl font-semibold'>Social links</h3>
      </div>
      <form className='flex flex-row flex-wrap  gap-5'>
        <div className='flex flex-1 flex-col gap-3'>
          <div className='flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg bg-background-100 px-4 py-2'>
            <span className='flex flex-row flex-wrap items-center justify-between gap-5'>
              <Instagram size={18} />
              <span>Instagram</span>
            </span>
            <div className='flex flex-row items-center'>
              <input
                type='text'
                name='instagram'
                className='rounded-lg bg-transparent px-2 py-1 text-right font-normal hover:bg-background-500 focus:bg-background-500 focus:outline-none disabled:opacity-80'
                placeholder='Instagram'
              />
              <button className='rounded-md p-2 text-background-900 hover:bg-primary-500'>
                <Trash size={18} />
              </button>
            </div>
          </div>
          {/*  */}
          <div className='flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg bg-background-100 px-4 py-2'>
            <span className='flex flex-row flex-wrap items-center justify-between gap-5'>
              <Mail size={18} />
              <span>Mail</span>
            </span>
            <div className='flex flex-row items-center'>
              <input
                type='text'
                name='mail'
                className='rounded-lg bg-transparent px-2 py-1 text-right font-normal hover:bg-background-500 focus:bg-background-500 focus:outline-none disabled:opacity-80'
                placeholder='Mail'
              />
              <button className='rounded-md p-2 text-background-900 hover:bg-primary-500'>
                <Trash size={18} />
              </button>
            </div>
          </div>
          {/*  */}
        </div>
      </form>

      <AddSocialModalForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />

      <button
        className='mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary-900 hover:bg-background-100'
        onClick={() => setIsOpenModal(true)}>
        <Plus size={18} /> Add social
      </button>
    </div>
  )
}

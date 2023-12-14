'use client'

import clsx from 'clsx'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {zodResolver} from '@hookform/resolvers/zod'

type AddLinkFormProps = {
  saveLink: (args: any) => Promise<typeof args>
}

type FormData = {
  url: string
  label: string
}

const httpRegex = new RegExp(
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
)

const schema = z.object({
  url: z
    .string()
    .regex(httpRegex, 'Value must be a valid url. e.g. https://google.com '),
  label: z.string().min(1, {message: 'Required field'}),
})

export const AddLinkForm = ({saveLink}: AddLinkFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await saveLink(data)
    reset()
  }

  return (
    <div className='flex w-full flex-row gap-5 rounded-lg bg-white p-5'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-1 flex-col gap-2'>
        <input
          placeholder='Type the label'
          className={clsx(
            'border-1 w-full rounded-md border border-gray-400 p-2',
            errors.label && 'outline-red-400',
            errors.label && 'border-red-400',
          )}
          {...register('label', {required: true})}
        />
        {errors.label && (
          <p className='mt-0 text-sm text-red-600'>{errors.label.message}</p>
        )}

        <input
          placeholder='Type the url'
          className={clsx(
            'border-1 w-full rounded-md border border-gray-400 p-2',
            errors.url && 'outline-red-400',
            errors.url && 'border-red-400',
          )}
          {...register('url', {required: true})}
        />
        {errors.url && (
          <p className='mt-0 text-sm text-red-600'>{errors.url.message}</p>
        )}
        <button
          type='submit'
          className='rounded-md bg-green-600 py-2 text-white'>
          Add link
        </button>
      </form>
    </div>
  )
}

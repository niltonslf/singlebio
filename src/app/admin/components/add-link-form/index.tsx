'use client'

import clsx from 'clsx'
import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {Link} from '@/models'
import {useDebouce} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

type AddLinkFormProps = {
  saveLink: (link: Link) => void
  link: Link
}

const httpRegex = new RegExp(
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
)

const schema = z.object({
  url: z
    .string()
    .regex(httpRegex, 'Value must be a valid url. e.g. https://google.com '),
  label: z.string().min(3, {message: 'Required field'}),
  id: z.string(),
  order: z.number(),
})

export const AddLinkForm = ({saveLink, link}: AddLinkFormProps) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Link>({
    resolver: zodResolver(schema),
    defaultValues: link,
  })

  const url = watch('url')
  const label = watch('label')

  const handleChange = useDebouce(() => {
    formRef.current?.requestSubmit()
  })

  useEffect(() => {
    if (!isFirstLoad) {
      if (url && label) {
        handleChange()
      }
    } else {
      setIsFirstLoad(false)
    }
  }, [url, label])

  useEffect(() => {
    setIsFirstLoad(true)
  }, [link])

  return (
    <div className='flex w-full flex-row gap-5 rounded-lg '>
      <form
        ref={formRef}
        onSubmit={handleSubmit(saveLink)}
        className='flex flex-1 flex-col gap-2'>
        <input type='hidden' {...register('id', {required: false})} />
        <input
          type='hidden'
          {...register('order', {
            required: false,
            setValueAs: value => Number(value),
          })}
        />

        <input
          placeholder='Type the label'
          {...register('label', {required: true})}
          className={clsx(
            'border-1 w-full rounded-md border border-gray-500 bg-gray-900 p-2 text-gray-200',
            errors.label && 'outline-red-400',
            errors.label && 'border-red-400',
          )}
        />
        {errors.label && (
          <p className='mt-0 text-sm text-red-600'>{errors.label.message}</p>
        )}

        <input
          placeholder='Type the url'
          {...register('url', {required: true})}
          className={clsx(
            'border-1 w-full rounded-md border border-gray-500 bg-gray-900 p-2 text-gray-200',
            errors.url && 'outline-red-400',
            errors.url && 'border-red-400',
          )}
        />
        {errors.url && (
          <p className='mt-0 text-sm text-red-600'>{errors.url.message}</p>
        )}
      </form>
    </div>
  )
}

'use client'

import clsx from 'clsx'
import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {Link} from '@/domain/models'
import {merge, useDebounce, validateUrlRegex} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

type AddLinkFormProps = {
  saveLink: (link: Link) => void
  link: Link
}

const schema = z.object({
  url: z
    .string()
    .regex(
      validateUrlRegex,
      'Value must be a valid url. e.g. https://google.com ',
    )
    .refine(s => !s.includes(' '), 'White spaces are not allowed')
    .refine(s => !/[A-Z]/.test(s), 'Uppercase characters are not allowed'),
  label: z.string().min(3, {message: 'Required field'}),
  id: z.string(),
  order: z.number(),
})

export const AddLinkForm = ({saveLink, link}: AddLinkFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleChange = useDebounce(() => {
    formRef.current?.requestSubmit()
  })

  const handleSaveLink = async (link: Link) => {
    setIsSubmitting(true)
    await saveLink(link)
    setIsSubmitting(false)
  }

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
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleSaveLink)}
      className='relative flex w-full flex-1 flex-col'>
      <input type='hidden' {...register('id', {required: false})} />
      <input
        type='hidden'
        {...register('order', {
          required: false,
          setValueAs: value => Number(value),
        })}
      />

      <div
        className={merge([
          'loading loading-spinner loading-xs text-neutral-50',
          'absolute right-2 top-2 hidden',
          isSubmitting && 'block',
        ])}
      />

      <input
        placeholder='Type the label'
        {...register('label', {required: true})}
        className={clsx(
          'input input-ghost input-sm',
          errors.label && 'border border-primary',
        )}
      />
      {errors.label && (
        <p className='my-2 text-sm text-primary'>{errors.label.message}</p>
      )}

      <input
        placeholder='Type the url'
        {...register('url', {required: true})}
        className={clsx(
          'input input-ghost input-sm mt-1 font-light',
          errors.url && 'input-error',
        )}
      />

      {errors.url && (
        <p className='my-2 text-sm text-primary'>{errors.url.message}</p>
      )}
    </form>
  )
}

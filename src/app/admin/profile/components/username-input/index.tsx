import clsx from 'clsx'
import {Control, Controller, FieldErrors} from 'react-hook-form'
import * as z from 'zod'

import {User} from '@/models'
import {useMask} from '@react-input/mask'

export const usernameInputRules = {
  username: z
    .string()
    .transform(value => value.replace(/[\s@]+/g, ''))
    .pipe(z.string().min(4, {message: 'Required field'})),
}

export const usernameInputSchema = z.object({
  username: usernameInputRules.username,
})

export type UsernameInputForm = Required<Pick<User, 'username'>>

type UsernameInputProps = {
  control: Control<UsernameInputForm, any>
  isUsernameValid: boolean
  errors: FieldErrors<UsernameInputForm>
  onChange: (value: string) => void
}

export const UsernameInput = ({
  control,
  isUsernameValid,
  errors,
  onChange,
}: UsernameInputProps) => {
  const inputRef = useMask({
    mask: '@==============================',
    replacement: {'=': /[a-z0-9\-\_]/},
  })

  return (
    <>
      <Controller
        control={control}
        name='username'
        render={({field: {onChange: onChangeInput, onBlur, value}}) => (
          <input
            ref={inputRef}
            data-testid='modal-username-input'
            placeholder='Type your username'
            className={clsx(
              'bw solid input !border-background-600',
              !isUsernameValid && '!border-red-400 outline-none',
            )}
            onChange={event => {
              onChange(event.target.value)
              onChangeInput(event)
            }}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.username && (
        <p className='mt-1 text-sm text-red-400'>{errors.username.message}</p>
      )}
      {!isUsernameValid && (
        <p className='mt-1 text-sm text-red-400'>username already taken.</p>
      )}
    </>
  )
}

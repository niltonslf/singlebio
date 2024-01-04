import {Control, Controller, FieldErrors} from 'react-hook-form'
import * as z from 'zod'

import {InputErrorMsg} from '@/app/components'
import {User} from '@/models'
import {merge} from '@/utils'
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
  control: Control<any, any>
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
    <div className='w-full'>
      <Controller
        control={control}
        name='username'
        render={({field: {onChange: onChangeInput, onBlur, value}}) => (
          <input
            ref={inputRef}
            data-testid='modal-username-input'
            placeholder='Type your username'
            className={merge([
              'input input-bordered w-full ',
              !isUsernameValid && 'input-error ',
            ])}
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
        <InputErrorMsg>{errors.username.message}</InputErrorMsg>
      )}
      {!isUsernameValid && (
        <InputErrorMsg>username already taken</InputErrorMsg>
      )}
    </div>
  )
}

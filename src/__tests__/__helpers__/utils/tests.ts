import {ReactElement} from 'react'

import {RenderOptions, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export function setup(jsx: ReactElement, options?: RenderOptions) {
  return {
    user: userEvent.setup(),
    ...render(jsx, options),
  }
}

export const fail = () => {
  expect(true).toBe(false)
}

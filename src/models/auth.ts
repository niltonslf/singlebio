export type LoginWithEmailAndPassword = {
  email: string
  password: string
}

export type SignUpWithEmailAndPassword = {
  email: string
  password: string
  displayName: string
}

export enum Providers {
  'GITHUB' = 'github.com',
  'GOOGLE' = 'google.com',
}

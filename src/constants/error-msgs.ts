export const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Email already in use',
  'error-to-create-account': 'There was an error to create your account.',
  'error-to-authenticate-user': 'There was an error to authenticate user.',
  'user-not-found': 'User not found.',
  'auth/invalid-login-credentials': 'Email or password invalid.',
}
export type ErrorMessagesKeys = keyof typeof ERROR_MESSAGES

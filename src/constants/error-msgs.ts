export const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Email already in use',

  'auth/invalid-login-credentials': 'Email or password invalid.',

  'auth/account-exists-with-different-credential':
    'Email is already in use by another sign-in method.',

  'error-to-create-account': 'There was an error to create your account.',

  'error-to-authenticate-user': 'There was an error to authenticate user.',

  'user-not-found': 'User not found.',
}
export type ErrorMessagesKeys = keyof typeof ERROR_MESSAGES

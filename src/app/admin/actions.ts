'use server'

import {revalidateTag} from 'next/cache'

export const revalidateUserPage = async () => {
  revalidateTag('user-profile-data')
  revalidateTag('user-links-data')
}

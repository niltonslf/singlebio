'use server'

import {revalidateTag} from 'next/cache'

export const revalidateUserPage = async () => {
  revalidateTag('user-links-data')
  revalidateTag('user-profile-data')
}

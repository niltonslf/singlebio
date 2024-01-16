import {MetadataRoute} from 'next'

import {fetchAllUsernames} from '@/api/usecases'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  const usersProfile = await fetchAllUsernames()

  const usersProfilePage: MetadataRoute.Sitemap = usersProfile.map(user => ({
    url: `${appUrl}/${user.username}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  return [
    {
      url: appUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${appUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.2,
    },
    {
      url: `${appUrl}/auth`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...usersProfilePage,
  ]
}

import {MetadataRoute} from 'next'

import {fetchAllUsernames} from '@/api/usecases'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''

  const usersProfile = await fetchAllUsernames()

  const usersProfilePage: MetadataRoute.Sitemap = usersProfile.map(user => ({
    url: `${appUrl}/${user.username}`,
    lastModified: new Date(),
    changeFrequency: 'always',
    priority: 1,
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
      changeFrequency: 'never',
      priority: 1,
    },
    ...usersProfilePage,
  ]
}

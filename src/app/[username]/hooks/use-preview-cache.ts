import {useCallback} from 'react'

import {Link, User} from '@/models'

export const usePreviewCache = () => {
  const hasCache = useCallback(() => {
    const stringData = sessionStorage.getItem('preview-cache')
    return !!stringData
  }, [])

  const getCachedData = useCallback(() => {
    const stringData = sessionStorage.getItem('preview-cache')

    if (!stringData)
      return {
        user: {} as User,
        links: [] as Link[],
      }

    const parsedData = JSON.parse(stringData)

    return {
      user: parsedData.user as User,
      links: parsedData.links as Link[],
    }
  }, [])

  const createCacheData = useCallback((user: User, links: Link[]) => {
    const parsedData = JSON.stringify({user, links})
    sessionStorage.setItem('preview-cache', parsedData)
  }, [])

  return {
    createCacheData,
    getCachedData,
    hasCache,
  }
}

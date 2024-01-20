import {User as FbUser} from 'firebase/auth'

import {Providers} from '@/domain/enums'
import {faker} from '@faker-js/faker'

type MakeGetDocsResponse = Partial<{
  data: any
  docs: any[]
  path: string
  exists: boolean
  id: string
}>

export const makeFbUser = ({
  uid,
  displayName,
  email,
  photoURL,
  providerId,
}: Partial<FbUser> = {}) => {
  return {
    uid: uid ?? faker.string.uuid(),
    displayName: displayName ?? faker.person.fullName(),
    email: email ?? faker.internet.email(),
    photoURL: photoURL ?? faker.image.urlLoremFlickr(),
    providerData: [
      {
        providerId: providerId ?? Providers.GOOGLE,
      },
    ],
  } as FbUser
}

export const makeGetDocsResponse = ({
  data,
  docs,
  path,
  exists,
  id,
}: MakeGetDocsResponse): any => {
  return {
    ref: {path: path || 'some value'} as any,
    data: () => data,
    exists: () => exists ?? true,
    get: jest.fn(),
    id: id || '',
    metadata: {} as any,
    docs: makeGetDocsResponseDocProperty(docs),
    size: (data?.length || docs?.length) ?? 0,
  }
}

export const makeGetDocsResponseDocProperty = (data: any[] | undefined) => {
  if (!data) return

  return data.map(item => ({
    data: () => item,
    ref: {path: faker.string.uuid()} as any,
  }))
}

import {User as FbUser} from 'firebase/auth'

import {faker} from '@faker-js/faker'

type MakeGetDocsResponse = Partial<{
  data: any
  docs: any
  path: string
  exists: boolean
  id: string
}>

export const makeFbUser = () => {
  return {
    uid: faker.string.uuid(),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
    photoURL: faker.image.urlLoremFlickr(),
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

export const makeGetDocsResponseDocProperty = (data: any[]) => {
  if (!data) return

  return data.map(item => ({
    data: () => item,
    ref: {path: faker.string.uuid()} as any,
  }))
}

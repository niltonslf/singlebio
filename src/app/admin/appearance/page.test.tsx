import {cleanup} from '@testing-library/react'

jest.mock('@/app/admin/hooks/use-image-uploader', () => ({
  useImageUploader: () => {
    return {
      upload: () => 'path-to-file',
      returnImageThumbnail: () => 'image-path',
    }
  },
}))
jest.mock('@/app/admin/hooks/use-image-compressor', () => ({
  useImageCompressor: () => {
    return {compress: () => null}
  },
}))

jest.mock('firebase/auth', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/auth'),
}))

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  onSnapshot: jest.fn(() => jest.fn()),
}))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
}))

// const makeSUT = () => {
//   handlePageAuthentication(makeFbUser())

//   return setup(
//     <AdminLayoutWrapper>
//       <AppearancePage />
//     </AdminLayoutWrapper>,
//   )
// }

describe('Appearance Page', () => {
  afterEach(() => {
    cleanup()
  })

  it.todo('should save theme')

  it.todo('should reset theme')

  it.todo('should update appearanceStore when user theme updates')
})

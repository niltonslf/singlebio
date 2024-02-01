import {cleanup} from '@testing-library/react'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next-router-mock'),
  usePathname: jest.fn(() => '/'),
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

// const makeSUT = async () => {
//   return await waitFor(() =>
//     setup(
//       <AdminLayoutWrapper>
//         <p>children</p>
//       </AdminLayoutWrapper>,
//     ),
//   )
// }

describe('Admin Layout', () => {
  afterEach(() => {
    cleanup()
  })

  it.todo('should redirect to /auth if not authenticated')
})

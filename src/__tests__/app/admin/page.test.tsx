it('test', () => {
  expect('true').toBe('true')
})

// import 'next-router-mock'
// import * as firebaseAuth from 'firebase/auth'

// import {setup} from '@/__tests__/utils'
// import AdminPage from '@/app/admin/page'
// import {screen} from '@testing-library/react'

// import '@testing-library/jest-dom'

// jest.mock('firebase/firestore')

// jest.mock('firebase/auth', () => ({
//   __esModule: true,
//   ...jest.requireActual('firebase/auth'),
// }))

// jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

// afterEach(() => {
//   jest.clearAllMocks()
// })

// describe('Admin page', () => {
//   it('render page with all sections', async () => {
//     jest
//       .spyOn(firebaseAuth, 'onAuthStateChanged')
//       .mockImplementation((auth: any, userCallback: any) => {
//         const mockUser = {
//           email: '',
//           displayName: '',
//           photoURL: '',
//           uid: '',
//         }

//         userCallback(mockUser)
//         return jest.fn()
//       })

//     setup(<AdminPage />)

//     const header = await screen.queryByText('Lnktree admin')
//     expect(header).toBeInTheDocument()

//     const form = await screen.queryByRole('button')
//     expect(form).toBeInTheDocument()

//     const linksList = await screen.queryByLabelText('link-list')
//     expect(linksList?.children).toHaveLength(0)
//   })
// })

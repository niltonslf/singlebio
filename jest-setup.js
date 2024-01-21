import '@testing-library/jest-dom'
global.fetch = require('jest-mock-fetch')

jest.mock('react-social-icons', () => {
  return {
    SocialIcon: ({url, ...props}) => <div>{url}</div>,
  }
})

jest.mock('firebase/analytics', () => {
  return {
    ...jest.requireActual('firebase/analytics'),
    getAnalytics: jest.fn(),
  }
})

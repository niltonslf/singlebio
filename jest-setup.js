import '@testing-library/jest-dom'

jest.mock('react-social-icons', () => {
  return {
    SocialIcon: <></>,
  }
})

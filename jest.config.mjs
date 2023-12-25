import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['(/utils/.*)$'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['./jest-setup.js', 'jest-sinon'],
}

export default createJestConfig(config)

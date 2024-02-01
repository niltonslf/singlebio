import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/',
    '<rootDir>/node_modules/',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '/icons/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '/icons/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  workerThreads: true,
  maxWorkers: 3,
  cache: false,
}

export default createJestConfig(config)

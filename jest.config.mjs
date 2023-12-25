import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/__helpers__/'],
  testPathIgnorePatterns: ['/icons/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/icons/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  workerThreads: true,
  maxWorkers: 4,
}

export default createJestConfig(config)

import {app, auth, storage, provider, db, analytics} from '@/libs/firebase'
import {cleanup} from '@testing-library/react'

jest.mock('firebase/analytics', () => {
  return {
    __esModule: true,
    isSupported: jest.fn().mockResolvedValue(true),
    getAnalytics: jest.fn(() => true),
    setAnalyticsCollectionEnabled: jest.fn(),
  }
})

describe('Firebase config', () => {
  afterEach(() => {
    cleanup()
  })

  it('should start firebase successfully', () => {
    expect(app).toBeDefined()
    expect(auth).toBeDefined()
    expect(db).toBeDefined()
    expect(storage).toBeDefined()
    expect(provider).toBeDefined()
  })

  it('should start analytics successfully', async () => {
    expect(await analytics).toBe(true)
  })
})

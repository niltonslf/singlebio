'use client'

import {AnalyticsBrowser} from '@segment/analytics-next'

const key = process.env.NEXT_PUBLIC_SEGMENT_KEY || ''

export const segment = AnalyticsBrowser.load({writeKey: key})

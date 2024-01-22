export type ViewEntry = Record<string, string | number>

export type PageViewsRaw = {
  [x: string]: ViewEntry[]
}

export type PageViewsChartData = {
  categories: string[]
  data: number[]
}

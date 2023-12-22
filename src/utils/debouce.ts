import {useEffect, useRef} from 'react'

export const useDebounce = (
  callback: (...args: any) => any,
  delay: number = 500,
) => {
  const timer = useRef<number>(null)

  const debounce = (...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    // @ts-ignore
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [])

  return debounce
}

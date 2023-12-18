/**
 * It takes an type T as generic displaying the complete object in a more
 * understandable way.
 *
 * It will be useful for cases like this:
 * @example
 * type Example<T extends K> = {...} & OtherType & AnotherOne
 */
export type Spread<T extends object> = {
  [K in keyof T]: T[K]
}

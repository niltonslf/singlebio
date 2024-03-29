import {ThemeButtonProps} from '@/app/[username]/themes/types'
import {merge} from '@/utils'

export const ButtonDefault = ({
  children,
  className,
  styles,
}: ThemeButtonProps) => {
  return (
    <li
      className={merge([
        'btn btn-md flex h-auto w-full flex-wrap items-center justify-center border-none bg-white p-3 text-center font-medium text-base-200 shadow-md transition-all hover:scale-95 hover:text-base-content md:py-5',
        className,
      ])}
      style={styles}>
      {children}
    </li>
  )
}

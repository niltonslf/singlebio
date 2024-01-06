import {Moon, Sun} from 'lucide-react'
import {useTheme} from 'next-themes'

export const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme()
  const isDark = theme === 'dark'

  return (
    <label className='flex cursor-pointer gap-2'>
      <Sun size={18} />
      <input
        type='checkbox'
        value='dark'
        className='toggle'
        checked={isDark}
        onChange={() => setTheme(isDark ? 'light' : 'dark')}
      />
      <Moon size={18} />
    </label>
  )
}

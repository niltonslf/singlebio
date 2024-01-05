import Link from 'next/link'

export const HomeFooter = () => {
  return (
    <footer className='w-full py-5'>
      <ul className='m-auto flex w-full max-w-6xl flex-row items-center justify-start gap-5 text-xs'>
        <li className='hover:text-primary'>
          <Link href='/privacy-policy'>Privacy Policy</Link>
        </li>
        <li className='hover:text-primary'>
          <Link href='/cookies-settings'>Cookies settings</Link>
        </li>
      </ul>
    </footer>
  )
}

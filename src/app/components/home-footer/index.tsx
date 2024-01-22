import {Mail} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const HomeFooter = () => {
  return (
    <footer className='footer mx-auto items-center p-4 text-xs text-neutral-content'>
      <aside className='grid-flow-col items-center'>
        <Image
          src='/logo-icon-white.png'
          width={20}
          height={20}
          alt='Logo icon'
        />
        <p>Copyright © 2024 - All right reserved</p>•
        <Link href='/privacy-policy' className='link'>
          Privacy Policy
        </Link>
      </aside>
      <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
        <Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>
          <Mail size={15} />
        </Link>
      </nav>
    </footer>
  )
}

import {User} from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';

import {Dropdown} from '..';

type HeaderProps = {
  user: User;
};

export const Header = ({user}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutsideBox(event: any) {
      if (!dropdown?.current?.contains(event.target || null))
        return setIsOpen(false);
    }

    document.addEventListener('click', handleClickOutsideBox);
    return () => removeEventListener('click', handleClickOutsideBox);
  }, []);

  return (
    <header className='flex min-w-full flex-row items-center justify-between bg-gray-900 px-5 py-2'>
      <span className='text-md font-semibold text-white'>Lnktree admin</span>

      <div className='flex flex-row items-center justify-between gap-3'>
        <Dropdown>
          <span className=' font-semibold text-white'>{user?.displayName}</span>
          {user?.photoURL && (
            <Image
              className='rounded-full border-2'
              src={user?.photoURL}
              width={40}
              height={40}
              alt='User profile image'
            />
          )}
        </Dropdown>
        <Link
          href='/auth'
          className='group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            logout
          </span>
        </Link>{' '}
      </div>
    </header>
  );
};

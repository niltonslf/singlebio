import {User} from 'firebase/auth';
import Image from 'next/image';

type HeaderProps = {
  user: User;
};

export const Header = ({user}: HeaderProps) => {
  return (
    <header className='flex w-full flex-row items-center justify-between bg-slate-500 p-5'>
      <span className='text-lg font-semibold text-white'>Lnktree admin</span>
      <div className='flex flex-row items-center justify-between'>
        <span className='mr-2 font-semibold text-white'>
          {user?.displayName}
        </span>

        {user?.photoURL && (
          <Image
            className='rounded-full border-2'
            src={user?.photoURL}
            width={40}
            height={40}
            alt='User profile image'
          />
        )}
      </div>
    </header>
  );
};

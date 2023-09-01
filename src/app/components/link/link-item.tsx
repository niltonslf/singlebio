import Link from 'next/link';
import {ReactNode} from 'react';

type LinkItemProps = {
  path: string;
  children: ReactNode;
};

export const LinkItem = ({path, children}: LinkItemProps) => {
  return (
    <Link href={path} target='_blank'>
      <li className='flex w-full items-center justify-center rounded-md bg-white p-5 font-medium'>
        {children}
      </li>
    </Link>
  );
};

import {ReactNode} from 'react';

type LinkContainerProps = {
  children: ReactNode;
};

export const LinkContainer = ({children}: LinkContainerProps) => {
  return (
    <ul
      aria-label='link-list'
      className='flex w-full flex-col gap-5 overflow-y-auto p-10'>
      {children}
    </ul>
  );
};

import {ReactNode} from 'react';

type LinkContainerProps = {
  children: ReactNode;
};

export const LinkContainer = ({children}: LinkContainerProps) => {
  return <ul className='flex w-full flex-col gap-5 p-10'>{children}</ul>;
};

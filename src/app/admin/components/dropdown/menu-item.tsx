import {ReactNode} from 'react';

type MenuItemProps = {
  children: ReactNode;
};

export const MenuItem = ({children}: MenuItemProps) => {
  return (
    <li>
      <a
        href='#'
        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
        {children}
      </a>
    </li>
  );
};

'use client';

import {clsx} from 'clsx';
import {PropsWithChildren, useEffect, useRef, useState} from 'react';

import {DropdownMenu} from './dropdown-menu';
import {MenuItem} from './menu-item';

type DropdownProps = {
  any?: any;
} & PropsWithChildren;

export const Dropdown = ({children}: DropdownProps) => {
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
    <div
      ref={dropdown}
      className='relative flex h-full cursor-pointer flex-row items-center gap-3'
      onClick={() => setIsOpen(prev => !prev)}>
      {children}
      <DropdownMenu isOpen={isOpen}>
        <MenuItem>Delete account</MenuItem>
      </DropdownMenu>
    </div>
  );
};

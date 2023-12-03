'use client';

import {AddLinkForm, Header, LinksList} from './components';
import {useEffect, useState} from 'react';
import {auth} from '../libs/firebase';
import {User} from 'firebase/auth';

// export const metadata: Metadata = {
//   title: 'Admin',
// };

export default function Admin() {
  const [user, setUser] = useState<User>({} as any);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <div className='flex h-screen flex-col items-center overflow-auto bg-gray-300 px-10'>
      <Header user={user} />

      <main className=' grid h-screen w-full grid-cols-[3fr_2fr] grid-rows-1 overflow-hidden '>
        <section className='flex flex-1 flex-col justify-start p-10'>
          <section className='mt-5'>
            <AddLinkForm user={user} />
          </section>
        </section>

        <aside className='grid w-full grid-rows-1 '>
          <LinksList user={user} />
        </aside>
      </main>
    </div>
  );
}

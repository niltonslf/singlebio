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
    <div className='flex h-screen flex-col items-center bg-gray-300 p-10'>
      <Header user={user} />

      <main className='flex w-full flex-row'>
        <section className='flex flex-1 flex-col justify-start p-10'>
          <section className='mt-5'>
            <AddLinkForm user={user} />
          </section>
        </section>
        <aside className='flex w-2/5  justify-center  overflow-y-auto bg-gray-300'>
          <LinksList user={user} />
        </aside>
      </main>
    </div>
  );
}

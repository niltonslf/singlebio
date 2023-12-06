'use client';

import {User, onAuthStateChanged} from 'firebase/auth';
import {addDoc, collection, doc, getFirestore} from 'firebase/firestore';
import {useEffect, useState} from 'react';

import {app, auth} from '@/libs/firebase';

import {AddLinkForm, Header, LinksList} from './components';

const db = getFirestore(app);

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);

  const onSaveLink = async (data: any) => {
    if (!user) return;

    const res = await doc(db, 'users', user.uid);
    addDoc(collection(res, 'links'), data);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className='flex h-screen flex-col items-center overflow-auto bg-gray-300 px-10'>
      {!user ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header user={user} />

          <main className=' grid w-full grid-cols-1 grid-rows-1 md:h-screen md:grid-cols-[3fr_2fr] md:overflow-hidden'>
            <section className='flex flex-col justify-start p-10'>
              <section className='mt-5'>
                <AddLinkForm saveLink={onSaveLink} />
              </section>
            </section>

            <aside className='grid w-full grid-rows-1 '>
              <LinksList user={user} />
            </aside>
          </main>
        </>
      )}
    </div>
  );
}

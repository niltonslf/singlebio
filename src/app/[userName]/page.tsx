'use client';

import {useCallback, useEffect, useState} from 'react';
import {Link} from '../components';
import {app} from '@/libs/firebase';
import {collection, getFirestore, getDocs} from 'firebase/firestore';

type UserPageProps = {
  params: {
    userName: string;
  };
};

const db = getFirestore(app);

export default function UserPage({params}: UserPageProps) {
  const [links, setLinks] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    if (!params.userName) return () => {};

    const customQuery = await getDocs(
      collection(db, 'users', params.userName, 'links'),
    );

    const res = customQuery.docs;

    setLinks([]);
    res.forEach(doc => {
      setLinks(prev => [...prev, doc.data()]);
    });
  }, [params.userName]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className='flex h-screen items-center justify-center bg-gray-300 p-10'>
      <div className='w-full max-w-2xl '>
        <h2 className='mb-10 flex items-center justify-center text-2xl'>
          {params.userName}
        </h2>
        <Link.container>
          {links.length > 0 &&
            links.map(link => {
              return (
                <Link.item key={link.url} path={link.url}>
                  {link.label}
                </Link.item>
              );
            })}
        </Link.container>
      </div>
    </main>
  );
}

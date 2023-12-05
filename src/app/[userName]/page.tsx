'use client';

import {collection, getFirestore, getDocs} from 'firebase/firestore';
import {useCallback, useEffect, useState} from 'react';

import {app} from '@/libs/firebase';

import {Link} from '../components';

type UserPageProps = {
  params: {
    userName: string;
  };
};

const db = getFirestore(app);

export default function UserPage({params: {userName}}: UserPageProps) {
  const [links, setLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!userName) return setIsLoading(false);

    try {
      const {docs, size} = await getDocs(
        collection(db, 'users', userName, 'links'),
      );

      if (size === 0) throw new Error('no links');

      setLinks([]);
      docs.forEach(doc => setLinks(prev => [...prev, doc.data()]));
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }, [userName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className='flex h-screen items-center justify-center bg-gray-300 p-10'>
      <div className='w-full max-w-2xl '>
        <h2 className='mb-10 flex items-center justify-center text-2xl'>
          {userName}
        </h2>

        {links.length === 0 && isLoading === false && (
          <div className='rounded-md bg-red-300 p-2 shadow-md'>
            Profile not found
          </div>
        )}

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

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
    const {docs, size} = await getDocs(
      collection(db, 'users', userName, 'links'),
    );

    setLinks([]);

    if (size === 0) return setIsLoading(false);

    docs.forEach(doc => setLinks(prev => [...prev, doc.data()]));

    setIsLoading(false);
  }, [userName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className='flex h-screen items-center justify-center overflow-y-auto bg-gray-300 p-10  py-20'>
      <div className=' h-full w-full max-w-2xl '>
        <h2 className='mb-10 flex items-center justify-center text-2xl'>
          {userName}
        </h2>

        {links.length === 0 && isLoading === false && (
          <div className='rounded-md bg-red-300 p-2 shadow-md'>
            No links in this profile
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

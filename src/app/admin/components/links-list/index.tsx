'use client';

import {Link} from '@/app/components';
import {app} from '@/app/libs/firebase';
import {User} from 'firebase/auth';
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import {useCallback, useEffect, useState} from 'react';

type LinksListProps = {
  user: User;
};

const db = getFirestore(app);

export const LinksList = ({user}: LinksListProps) => {
  const [links, setLinks] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    const snapshot = await getDocs(collection(db, `users/${user.uid}/links`));
    const linksRes: any = [];

    snapshot.forEach(doc => linksRes.push(doc.data()));

    return linksRes;
  }, [user.uid]);

  useEffect(() => {
    if (user) fetchData().then(setLinks);
  }, [fetchData, user]);

  return (
    <Link.container>
      {links.length > 0 &&
        links.map(link => (
          <Link.item path={link.url} key={link.url}>
            {link.label}
            <span className='w-full text-center text-xs text-gray-700'>
              {link.url}
            </span>
          </Link.item>
        ))}
    </Link.container>
  );
};

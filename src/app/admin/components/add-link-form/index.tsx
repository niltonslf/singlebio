'use client';

import {User} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
} from 'firebase/firestore';
import {Grip} from 'lucide-react';
import {useForm} from 'react-hook-form';

import {app} from '@/libs/firebase';

const db = getFirestore(app);

type AddLinkFormProps = {
  user: User;
};

type FormData = {
  url: string;
  label: string;
};

export const AddLinkForm = ({user}: AddLinkFormProps) => {
  const {register, handleSubmit, reset} = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await doc(db, 'users', user.uid);
    addDoc(collection(res, 'links'), data);
    reset();
  };

  return (
    <div className='flex w-full flex-row gap-5 rounded-lg bg-white p-5'>
      <Grip />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-1 flex-col gap-2'>
        <input
          placeholder='Type the url'
          className='border-1 w-full rounded-md border border-gray-400 p-2'
          {...register('url', {required: true})}
        />
        <input
          placeholder='type the label'
          className='border-1 w-full rounded-md border border-gray-400 p-2'
          {...register('label', {required: true})}
        />
        <button
          type='submit'
          className='rounded-md bg-green-600 py-2 text-white'>
          Save
        </button>
      </form>
    </div>
  );
};

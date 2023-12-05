'use client';

import {useForm} from 'react-hook-form';

type AddLinkFormProps = {
  saveLink: (args: any) => Promise<typeof args>;
};

type FormData = {
  url: string;
  label: string;
};

export const AddLinkForm = ({saveLink}: AddLinkFormProps) => {
  const {register, handleSubmit, reset} = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await saveLink(data);
    reset();
  };

  return (
    <div className='flex w-full flex-row gap-5 rounded-lg bg-white p-5'>
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

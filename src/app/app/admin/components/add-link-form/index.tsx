import {Grip} from 'lucide-react';

type AddLinkFormProps = {
  any?: any;
};

export const AddLinkForm = ({}: AddLinkFormProps) => {
  return (
    <div className='flex w-full flex-row gap-5 rounded-lg bg-white p-5'>
      <Grip />
      <div className='flex flex-1 flex-col gap-2'>
        <input
          placeholder='Type the url'
          className='border-1 w-full rounded-md border border-gray-400 p-2'
        />
        <input
          placeholder='type the label'
          className='border-1 w-full rounded-md border border-gray-400 p-2'
        />
        <button className='rounded-md bg-green-600 py-2 text-white'>
          Save
        </button>
      </div>
    </div>
  );
};

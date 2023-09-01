import {Grip} from 'lucide-react';

type CardProps = {
  any?: any;
};

export const Card = ({}: CardProps) => {
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
      </div>
    </div>
  );
};

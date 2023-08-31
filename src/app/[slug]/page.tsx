type UserPageProps = {
  any?: any;
};

export default function UserPage(props: UserPageProps) {
  console.log({ props });

  return (
    <main className='flex h-screen items-center justify-center bg-gray-300 p-10'>
      <div className='w-full max-w-2xl '>
        <h2 className='mb-10 flex items-center justify-center text-2xl'>
          @niltonslf
        </h2>
        <ul className='flex flex-col gap-5'>
          <li className='flex items-center justify-center rounded-md bg-white p-5 font-medium'>
            Link 01
          </li>
          <li className='flex items-center justify-center rounded-md bg-white p-5 font-medium'>
            Link 02
          </li>
          <li className='flex items-center justify-center rounded-md bg-white p-5 font-medium'>
            Link 03
          </li>
          <li className='flex items-center justify-center rounded-md bg-white p-5 font-medium'>
            Link 04
          </li>
        </ul>
      </div>
    </main>
  );
}

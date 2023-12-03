import {Link} from '../components';

type UserPageProps = {
  any?: any;
};

export default function UserPage(props: UserPageProps) {
  console.log({props});

  return (
    <main className='flex h-screen items-center justify-center bg-gray-300 p-10'>
      <div className='w-full max-w-2xl '>
        <h2 className='mb-10 flex items-center justify-center text-2xl'>
          @niltonslf
        </h2>
        <Link.container>
          <Link.item path='#'>Link 01</Link.item>
          <Link.item path='#'>Link 02</Link.item>
          <Link.item path='#'>Link 03</Link.item>
          <Link.item path='#'>Link 04</Link.item>
          <Link.item path='#'>Link 05</Link.item>
        </Link.container>
      </div>
    </main>
  );
}

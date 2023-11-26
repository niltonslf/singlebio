import {Link} from '@/app/components';
import {Metadata} from 'next';
import {AddLinkForm} from './components';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function Admin() {
  return (
    <div className='flex h-screen flex-col items-center bg-gray-300 p-10'>
      <header className='w-full bg-slate-500 p-5'>Header</header>
      <main className='flex w-full flex-row'>
        <section className='flex flex-1 flex-col justify-start p-10'>
          <div className='flex w-full justify-center rounded-full bg-blue-600 p-3 text-white'>
            Add Link
          </div>

          <section className='mt-5'>
            <AddLinkForm />
          </section>
        </section>
        <aside className='flex w-2/5  justify-center  bg-gray-300'>
          <Link.container>
            <Link.item path='#'>Link 01</Link.item>
            <Link.item path='#'>Link 01</Link.item>
            <Link.item path='#'>Link 01</Link.item>
            <Link.item path='#'>Link 01</Link.item>
            <Link.item path='#'>Link 01</Link.item>
            <Link.item path='#'>Link 01</Link.item>
          </Link.container>
        </aside>
      </main>
    </div>
  );
}

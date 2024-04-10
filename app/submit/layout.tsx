import { PropsWithChildren } from '@/types';
import Link from 'next/link';

export default function SubmitLayout({ children }: PropsWithChildren) {
  return (
    <main className='relative px-3 h-screen py-10 md:mx-36 lg:py-20'>
      <div className='mb-6 flex w-full justify-center lg:absolute lg:block'>
        <div className='w-96'>
          <Link href='/' className='underline'>
            Cancel
          </Link>
        </div>
      </div>
      <div className='flex w-full justify-center'>
        <div className='w-96'>{children}</div>
      </div>
    </main>
  );
}

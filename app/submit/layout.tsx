import { PropsWithChildren } from '@/types';
import Link from 'next/link';

export default function SubmitLayout({ children }: PropsWithChildren) {
  return (
    <main className='relative mx-2 my-10 h-screen md:mx-36 lg:my-20'>
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

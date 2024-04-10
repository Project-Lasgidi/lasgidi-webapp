'use client';
import { PropsWithChildren } from '@/types';
import { useRouter } from 'next/navigation';

export default function SubmitLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <main className='relative h-screen px-3 py-10 md:mx-36 lg:py-20'>
      <div className='mb-6 flex w-full justify-center lg:absolute lg:block'>
        <div className='w-96'>
          <p className='cursor-pointer underline' onClick={() => router.back()}>
            Cancel
          </p>
        </div>
      </div>
      <div className='flex w-full justify-center'>
        <div className='w-96'>{children}</div>
      </div>
    </main>
  );
}

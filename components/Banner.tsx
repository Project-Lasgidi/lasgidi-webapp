'use client';

import { CaretIcon } from '@/components/Icons';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const router = useRouter();
  return (
    <section className='flex flex-col items-center gap-6 bg-hero-image bg-cover bg-no-repeat pb-16 pt-20 md:pb-28 md:pt-24'>
      <div className='flex flex-col items-center  gap-4'>
        <p className='text-center text-6xl font-bold text-black'>
          The Lasgidi Project
        </p>
        <p className='normal-text w-3/5 text-center md:w-full'>
          A repository of tech communities, conferences and more.
        </p>
      </div>
      <div className='grid place-items-center gap-6'>
        <button
          className='flex items-center gap-2 space-x-2 rounded-3xl bg-black px-14 py-3 text-base font-normal text-white md:px-6'
          onClick={() => {
            router.push('/submit');
          }}
        >
          Submit
          <CaretIcon />
        </button>
        <p className='text-base font-normal text-black'>
          <span>Or </span>
          <span className='underline'>Browse</span>
        </p>
      </div>
    </section>
  );
};

export default Banner;

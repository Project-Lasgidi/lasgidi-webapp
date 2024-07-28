import Image from 'next/image';
import Link from 'next/link';
import { Community } from '@/payload-types';
import { getPayloadImageUrl } from '@/lib/utils';

interface ICommunityCard {
  community: Community;
}

const NewPill = () => (
  <p className='w-fit rounded-3xl bg-neutral-400 px-2 py-1.5 text-center text-xs font-bold uppercase text-white'>
    New
  </p>
);

export const CommunityCard = ({ community }: ICommunityCard) => {
  const { name, logo, description, website } = community;

  return (
    <div className='flex w-full flex-col justify-between gap-6 border-b border-neutral-100 py-6 md:flex-row'>
      <div className='flex flex-col gap-6 md:flex-row'>
        <div className='flex gap-6'>
          <Image
            className='aspect-square h-32 w-32 shrink-0 overflow-hidden rounded-2xl object-cover hover:opacity-75'
            src={getPayloadImageUrl(logo)!}
            alt='community icon'
            width={100}
            height={100}
          />
          <div className='w-1/2 md:hidden'>
            <NewPill />
            <p className='mt-2 text-2xl font-bold text-black'>{name}</p>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <div className='hidden items-center gap-2 md:flex'>
              <p className='truncate text-2xl font-bold text-black'>{name}</p>
              <NewPill />
            </div>
            <p className='w-full text-base font-normal leading-relaxed text-zinc-600 md:max-w-lg'>
              {description}
            </p>
          </div>
        </div>
      </div>

      <Link href={website} target='_blank'>
        <p className='text-left text-xl font-medium text-black md:hidden'>
          Visit Website
        </p>
        <div className='hidden aspect-square h-32 w-32 cursor-pointer place-items-center gap-2 rounded-3xl bg-neutral-50 hover:scale-105 md:grid'>
          <p className='text-center text-xl font-medium text-black'>
            Visit
            <br />
            Website
          </p>
        </div>
      </Link>
    </div>
  );
};

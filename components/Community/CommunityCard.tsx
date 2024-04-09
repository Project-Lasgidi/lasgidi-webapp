import { ReactNode } from 'react';
import { DjangoIcon, GithubIcon, PythonIcon, WorldWideWebIcon } from '../Icons';
import Image from 'next/image';
import Link from 'next/link';
import { IImageUrl } from '@/types';

const CommunityIcons: Record<string, ReactNode> = {
  python: <PythonIcon />,
  github: <GithubIcon />,
  worldwideweb: <WorldWideWebIcon />,
  django: <DjangoIcon />,
};

const IcoBadge = ({ name }: { name: string }) => (
  <div className='flex items-center justify-center gap-1.5 rounded-3xl bg-neutral-50 px-2 py-1.5'>
    {CommunityIcons[name.toLowerCase()]}
    <p className='text-xs font-normal text-black'>{name}</p>
  </div>
);

interface ICommunityCard {
  title: string;
  logo: IImageUrl;
  description: string;
  visit_url: string;
  programs: string[];
}

const NewPill = () => (
  <p className='w-fit rounded-3xl bg-neutral-400 px-2 py-1.5 text-center text-xs font-bold uppercase text-white'>
    New
  </p>
);

export const CommunityCard = ({
  title,
  logo,
  description,
  programs,
  visit_url,
}: ICommunityCard) => (
  <div className='flex w-full flex-col justify-between gap-6 border-b border-neutral-100 px-4 py-6 md:flex-row'>
    <div className='flex flex-col gap-6 md:flex-row'>
      <div className='flex gap-6'>
        <Image
          className='group aspect-square h-32 w-32 shrink-0 overflow-hidden rounded-2xl object-contain group-hover:opacity-75'
          src={logo.url}
          alt='community icon'
          width={logo.width}
          height={logo.height}
        />
        <div className='w-1/2 md:hidden'>
          <NewPill />
          <p className='mt-2 text-2xl font-bold text-black'>{title}</p>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <div className='hidden items-center gap-2 md:flex'>
            <p className='truncate text-2xl font-bold text-black'>{title}</p>
            <NewPill />
          </div>
          <p className='w-full text-base font-normal leading-relaxed text-zinc-600 md:max-w-lg'>
            {description}
          </p>
        </div>
        <div className='flex gap-3'>
          {(programs || []).map((program, idx) => (
            <IcoBadge key={idx} name={program} />
          ))}
        </div>
      </div>
    </div>

    <Link href={visit_url} target='_blank'>
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

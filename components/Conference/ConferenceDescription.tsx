import React from 'react';
import { CalendarIcon, LinkToIcon, LocationIcon } from '../Icons';
import Image from 'next/image';
import { IConference } from '@/types';
import Link from 'next/link';
import classNames from '@/lib/classNames';

export interface IConferenceDescription {
  isBig?: boolean;
  conference: Omit<IConference, 'pictures'>;
}

export const ConferenceDescription = ({
  isBig = false,
  conference,
}: IConferenceDescription) => {
  const { title, description, date, organization, logo, website, location } =
    conference;

  return (
    <div>
      {isBig && (
        <p className='mb-10 w-fit rounded-3xl bg-white px-2.5 py-1 text-sm font-semibold text-black'>
          🕥 Upcoming conferences
        </p>
      )}
      <p
        className={classNames(
          'font-bold text-black',
          isBig ? 'mb-6 w-96 text-5xl' : 'text-2xl leading-6'
        )}
      >
        {title}
      </p>
      <p
        className={classNames(
          'normal-text',
          isBig ? 'mb-4 w-full md:w-96' : 'my-4 leading-6 text-gray-600'
        )}
      >
        {description}
      </p>
      <div className='flex items-center justify-start gap-2'>
        <CalendarIcon />
        <p className={`normal-text ${!isBig && 'text-gray-600'}`}>{date}</p>
      </div>

      <div className='flex items-center justify-start gap-2'>
        <LocationIcon />
        <p className={`normal-text ${!isBig && 'text-gray-600'}`}>{location}</p>
      </div>

      <div className='mt-6 flex gap-4'>
        <Image
          className='h-10 w-10 rounded-3xl'
          src={logo}
          alt='conference logo'
          width={0}
          height={0}
        />
        <div className='flex flex-col items-start justify-start'>
          <div className='text-xl font-bold text-black'>{organization}</div>
          <div className='flex items-center justify-start gap-1'>
            <Link href={website} target='_blank'>
              <div className='flex items-center gap-1'>
                <p className='text-base font-normal leading-relaxed text-zinc-600 underline'>
                  {website}
                </p>
                <LinkToIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

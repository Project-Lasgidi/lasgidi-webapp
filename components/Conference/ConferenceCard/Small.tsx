'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import { omit } from 'lodash';
import { CarouselControls } from '@/components/Carousel';
import { useCarousel } from '@/hooks';
import { ConferenceDescription } from '../ConferenceDescription';
import type { IConference } from '@/types';

interface IConferenceCardSmall {
  conference: IConference;
}

export const ConferenceCardSmall = ({ conference }: IConferenceCardSmall) => {
  const pictures = conference.pictures;
  const conferenceItem = omit(conference, 'pictures');
  const {
    settings,
    sliderRef,
    currentSlide,
    handleNextCarousel,
    handlePreviousCarousel,
  } = useCarousel({ speed: 500, autoplaySpeed: 5000 });

  return (
    <div className='relative flex flex-col gap-4 overflow-x-hidden md:flex-row lg:ml-[10%]'>
      <div className='w-full px-4 md:order-2 md:max-w-md xl:px-0'>
        <ConferenceDescription conference={conferenceItem} />
      </div>
      <div className='relative h-[300px] w-full md:w-96 md:pl-4'>
        <Slider ref={sliderRef} {...settings}>
          {pictures.map((picture, idx) => (
            <Image
              key={idx}
              className='relative aspect-square h-[300px] w-full object-cover md:rounded-2xl'
              src={picture}
              alt='Conference'
              width={0}
              height={0}
            />
          ))}
        </Slider>

        <div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
          <CarouselControls
            currentSlide={currentSlide}
            totalSlides={pictures.length}
            onNext={handleNextCarousel}
            onPrevious={handlePreviousCarousel}
          />
        </div>
      </div>
    </div>
  );
};

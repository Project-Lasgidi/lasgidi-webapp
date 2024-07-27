'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import { omit } from 'lodash-es';
import { CarouselControls } from '@/components/Carousel';
import { useCarousel } from '@/hooks';
import { ConferenceDescription } from '../ConferenceDescription';
import { Conference } from '@/payload-types';
import { getPayloadImageUrl } from '@/lib/utils';

interface IConferenceCardSmall {
  conference: Conference;
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
    <div className='relative flex flex-col gap-x-6 overflow-x-hidden pb-6 md:flex-row md:py-6'>
      <div className='w-full md:order-2 md:max-w-md'>
        <ConferenceDescription conference={conferenceItem} />
      </div>
      <div className='relative h-[300px] w-full md:w-[380px]'>
        <Slider ref={sliderRef} {...settings}>
          {pictures.map((picture, idx) => (
            <Image
              key={idx}
              className='relative aspect-square h-[300px] w-full object-cover md:rounded-2xl '
              src={getPayloadImageUrl(picture.picture)!}
              alt='Conference picture'
              width={100}
              height={100}
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

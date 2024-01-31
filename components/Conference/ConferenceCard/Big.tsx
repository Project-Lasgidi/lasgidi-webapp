'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import { omit } from 'lodash';
import Container from '@/components/Container';
import { useCarousel } from '@/hooks/useCarousel';
import { ConferenceDescription } from '../ConferenceDescription';
import { IConference } from '@/types';
import { classNames } from '@/lib';

interface IConferenceCardBig {
  conference: IConference;
}

export const ConferenceCardBig = ({ conference }: IConferenceCardBig) => {
  const pictures = conference.pictures;
  const conferenceItem = omit(conference, 'pictures');
  const {
    settings,
    sliderRef,
    currentSlide,
    handleNextCarousel,
    handlePreviousCarousel,
  } = useCarousel();

  return (
    <>
      <Container
        className={classNames(
          'w-full px-0 md:px-4',
          'relative flex flex-col overflow-x-hidden overflow-y-hidden',
          'bg-neutral-100 md:h-[550px] md:flex-row md:bg-transparent'
        )}
      >
        <div className='w-full px-4 pb-3 max-md:pt-8 md:w-1/2 md:px-0 md:pb-28 xl:w-2/5'>
          <ConferenceDescription isBig conference={conferenceItem} />
        </div>

        <div className='h-full w-full bg-white md:w-1/2 md:bg-[unset] xl:w-3/5'>
          <Slider ref={sliderRef} {...settings}>
            {pictures.map((picture, idx) => (
              <Image
                key={idx}
                className='h-72 w-full object-cover md:h-[550px] md:rounded-t-2xl'
                src={picture}
                alt='Carousel'
                width={0}
                height={0}
              />
            ))}
          </Slider>
        </div>
      </Container>
    </>
  );
};

'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import { omit } from 'lodash';
import Container from '@/components/Container';
import { CarouselControls } from '@/components/Carousel';
import { useCarousel } from '@/hooks/useCarousel';
import { ConferenceDescription } from '../ConferenceDescription';
import { IConference } from '@/types';

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
      <Container className='relative flex overflow-x-hidden overflow-y-hidden md:h-[550px]'>
        <div className='w-full pb-3 md:w-1/2 md:pb-28'>
          <ConferenceDescription isBig conference={conferenceItem} />
        </div>
        <div className='hidden h-full md:block'>
          <div className='absolute right-4 top-0 h-full w-full md:w-1/2'>
            <Slider ref={sliderRef} {...settings} className='h-[550px]'>
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
        </div>
      </Container>

      {/* Small tablets and bigger screens */}
      <div className='relative bg-white md:hidden'>
        <Slider ref={sliderRef} {...settings}>
          {pictures.map((picture, idx) => (
            <Image
              key={idx}
              className='h-72 w-full object-cover md:rounded-t-2xl'
              src={picture}
              alt='Carousel'
              width={0}
              height={0}
            />
          ))}
        </Slider>
        <div className='mb-10 mt-3 flex justify-center'>
          <CarouselControls
            currentSlide={currentSlide}
            totalSlides={conference.pictures.length}
            onPrevious={handlePreviousCarousel}
            onNext={handleNextCarousel}
          />
        </div>
      </div>
    </>
  );
};

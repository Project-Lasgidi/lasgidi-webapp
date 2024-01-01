'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import Container from '../../Container';
import { CarouselControls } from '../../CarouselControls';
import { useCarousel } from '@/hooks/useCarousel';
import { ConferenceDescription } from '../ConferenceDescription';
import { IConference } from '@/types';
import * as _ from 'lodash';

interface IConferenceCardBig {
  conference: IConference;
}

export const ConferenceCardBig = ({ conference }: IConferenceCardBig) => {
  const pictures = conference.pictures;
  const conferenceItem = _.omit(conference, 'pictures');
  const {
    settings,
    sliderRef,
    currentSlide,
    handleNextCarousel,
    handlePreviousCarousel,
  } = useCarousel();

  return (
    <>
      <Container className='relative overflow-x-hidden'>
        <div className='w-full pb-3 md:w-1/2 md:pb-28'>
          <ConferenceDescription isBig conference={conferenceItem} />
        </div>
        <div className='hidden pb-6 md:block'>
          <div className='absolute right-4 top-0 w-full md:w-1/2'>
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
          <CarouselControls
            currentSlide={currentSlide}
            totalSlides={conference.pictures.length}
            onPrevious={handlePreviousCarousel}
            onNext={handleNextCarousel}
          />
        </div>
      </Container>
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

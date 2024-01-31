'use client';
import Slider from 'react-slick';
import { classNames } from '@/lib';
import { useCarousel } from '@/hooks';
import CarouselControls from './Controls.tsx';
import type { PropsWithChildren } from '@/types';
import Container from '@/components/Container.tsx';

type Props = PropsWithChildren<{
  className?: string;
  totalSlides: number;
}>;

export default function UpcomingConferencesCarousel(props: Props) {
  const {
    settings,
    sliderRef,
    currentSlide,
    handleNextCarousel,
    handlePreviousCarousel,
  } = useCarousel();

  return (
    <div
      id='upcoming-conferences-carousel'
      className={classNames('relative', props.className)}
    >
      <Slider ref={sliderRef} {...settings}>
        {props.children}
      </Slider>

      <Container className='absolute bottom-6 left-0 right-0 w-[1200px]'>
        <CarouselControls
          currentSlide={currentSlide}
          totalSlides={props.totalSlides}
          onPrevious={handlePreviousCarousel}
          onNext={handleNextCarousel}
        />
      </Container>
    </div>
  );
}

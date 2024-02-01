'use client';
import { createContext, useRef } from 'react';
import type { MutableRefObject } from 'react';
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

export type ConferencesCarouselContextValue = {
  parentSliderRef?: MutableRefObject<Slider | null>;
  carouselRootElementRef?: MutableRefObject<HTMLDivElement | null>;
};
export const ConferencesCarouselContext =
  createContext<ConferencesCarouselContextValue>({});

export default function UpcomingConferencesCarousel(props: Props) {
  const carouselRootElementRef = useRef<HTMLDivElement | null>(null);
  const {
    settings,
    sliderRef,
    currentSlide,
    handleNextCarousel,
    handlePreviousCarousel,
  } = useCarousel({
    autoplay: false,
    autoplaySpeed: 0,
    speed: 500,
  });

  function triggerManualSlideEvent(direction: 'next' | 'previous') {
    return () => {
      const event = new CustomEvent('carousel-manual-slide', {
        detail: {
          currentSlide,
        },
      });
      carouselRootElementRef.current?.dispatchEvent(event);

      direction === 'next' ? handleNextCarousel() : handlePreviousCarousel();
    };
  }

  return (
    <ConferencesCarouselContext.Provider
      value={{ parentSliderRef: sliderRef, carouselRootElementRef }}
    >
      <div
        ref={carouselRootElementRef}
        id='upcoming-conferences-carousel'
        className={classNames('relative', props.className)}
      >
        <Slider ref={sliderRef} {...settings}>
          {props.children}
        </Slider>

        <Container
          id='carousel-controls-container'
          className={classNames(
            'static bottom-6 left-0 right-0 w-full md:absolute min-[1215px]:w-[1200px]',
            'mt-4 flex items-center justify-center md:mt-0 md:block'
          )}
        >
          <CarouselControls
            currentSlide={currentSlide}
            totalSlides={props.totalSlides}
            onPrevious={triggerManualSlideEvent('previous')}
            onNext={triggerManualSlideEvent('next')}
          />
        </Container>
      </div>
    </ConferencesCarouselContext.Provider>
  );
}

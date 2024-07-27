'use client';
import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { omit } from 'lodash-es';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { useCarousel } from '@/hooks';
import { ConferenceDescription } from '../ConferenceDescription';
import { classNames } from '@/lib';
import { ConferencesCarouselContext } from '@/components/Carousel';
import { Conference } from '@/payload-types';
import { getPayloadImageUrl } from '@/lib/utils';

interface IConferenceCardBig {
  conference: Conference;
}

export const ConferenceCardBig = ({ conference }: IConferenceCardBig) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { parentSliderRef } = useContext(ConferencesCarouselContext);
  const [ref, entry] = useIntersectionObserver({ threshold: 1 });

  const { settings, sliderRef, currentSlide } = useCarousel({
    autoplay: false,
    infinite: false,
    speed: 500,
    autoplaySpeed: 0,
  });

  const conferenceItem = omit(conference, 'pictures');

  function clearCarouselInterval() {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  useEffect(() => {
    const elementIsVisible = entry?.isIntersecting ?? false;

    if (elementIsVisible && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        sliderRef?.current?.slickNext();
      }, 4000);
    }

    if (intervalRef.current) {
      if (currentSlide === conference.pictures?.length - 1) {
        clearCarouselInterval();

        setTimeout(() => {
          parentSliderRef?.current?.slickNext();
          sliderRef?.current?.slickGoTo(0, true);
        }, 4000);
      }
    }

    if (!elementIsVisible) clearCarouselInterval();

    return clearCarouselInterval;
  }, [
    conference.pictures,
    conferenceItem.name,
    currentSlide,
    entry?.isIntersecting,
    parentSliderRef,
    sliderRef,
  ]);

  useEffect(() => {
    const rootElement = document.querySelector(
      '#upcoming-conferences-carousel'
    )!;

    rootElement.addEventListener(
      'carousel-manual-slide' as any,
      clearCarouselInterval
    );

    return () => {
      rootElement.removeEventListener(
        'carousel-manual-slide' as any,
        clearCarouselInterval
      );
    };
  }, []);

  return (
    <div ref={ref}>
      <div
        className={classNames(
          'app-container w-full',
          'relative flex flex-col overflow-x-hidden overflow-y-hidden',
          'bg-neutral-100 md:h-[550px] md:flex-row md:bg-transparent'
        )}
      >
        <div className='w-full px-4 pb-3 max-md:pt-8 md:w-1/2 md:px-0 md:pb-28 xl:w-2/5'>
          <ConferenceDescription isBig conference={conferenceItem} />
        </div>

        <div className='h-full w-full bg-white md:w-1/2 md:bg-[unset] xl:w-3/5'>
          <Slider ref={sliderRef} {...settings}>
            {conference.pictures.map((picture, idx) => (
              <Image
                key={idx}
                className='h-72 w-full object-cover md:h-[550px] md:rounded-t-2xl'
                src={getPayloadImageUrl(picture.picture)!}
                alt='Carousel'
                width={100}
                height={100}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

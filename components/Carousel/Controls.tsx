import React from 'react';
import { CarouselControlIcon } from '../Icons';
import { classNames } from '@/lib';

interface ICarouselControls {
  className?: string;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function CarouselControls({
  className,
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
}: ICarouselControls) {
  return (
    <div className={classNames('flex items-center gap-4', className)}>
      <CarouselControlIcon onClick={onPrevious} />
      <div className='flex items-center gap-2'>
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={classNames(
              'grid h-5 w-5 place-items-center rounded-full p-1',
              'border border-gray-300 transition-transform duration-1000 ease-linear'
            )}
          >
            <div
              className={classNames(
                'h-2 w-2 rounded-full',
                currentSlide >= index ? 'bg-black' : 'bg-gray-300'
              )}
            />
          </div>
        ))}
      </div>
      <CarouselControlIcon
        className='rotate-180 transform transition-transform duration-300'
        onClick={onNext}
      />
    </div>
  );
}

import { useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';

export const useCarousel = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings: Settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    autoplaySpeed: 10000,
    focusOnSelect: true,
    lazyLoad: 'progressive',
    speed: 3000,
    afterChange: (index: number) => {
      setCurrentSlide(index);
    },
  };

  const handlePreviousCarousel = () => {
    sliderRef.current?.slickPrev();
  };
  const handleNextCarousel = () => {
    sliderRef.current?.slickNext();
  };

  return {
    currentSlide,
    sliderRef,
    settings,
    handlePreviousCarousel,
    handleNextCarousel,
  };
};

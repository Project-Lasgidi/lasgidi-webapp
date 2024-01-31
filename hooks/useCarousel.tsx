import { useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';

export const useCarousel = (settings: Omit<Settings, 'afterChange'> = {}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSettings: Settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    autoplaySpeed: 10000,
    focusOnSelect: true,
    lazyLoad: 'progressive',
    speed: 3000,
    ...settings,
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
    settings: defaultSettings,
    handlePreviousCarousel,
    handleNextCarousel,
  };
};

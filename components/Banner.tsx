'use client';

import { CaretIcon } from '@/components/Icons';
import { SubmitOptionsModal } from './SubmitOptionsModal';
import { useToggle } from 'usehooks-ts';
import Button from './Forms/Button';
import { useSubmitButton } from '@/hooks/useSubmitButton';

const Banner = () => {
  const { handleSubmitMouseEnter, handleSubmitMouseLeave, submitStroke } =
    useSubmitButton();
  const [openSubmitModal, _, setValue] = useToggle();

  const handleCloseSuccessModal = () => {
    setValue(false);
  };
  const handleOpenSuccessModal = () => {
    setValue(true);
  };

  return (
    <>
      <SubmitOptionsModal
        isOpen={openSubmitModal}
        onClose={handleCloseSuccessModal}
      />
      <section className='flex flex-col items-center gap-6 bg-hero-image bg-cover bg-no-repeat pb-16 pt-20 md:pb-28 md:pt-24'>
        <div className='flex flex-col items-center  gap-4'>
          <p className='text-center text-6xl font-bold text-black'>
            The Lasgidi Project
          </p>
          <p className='normal-text w-3/5 text-center md:w-full'>
            A repository of tech communities, conferences and more.
          </p>
        </div>
        <div className='grid place-items-center gap-6'>
          <Button
            onClick={handleOpenSuccessModal}
            onMouseEnter={handleSubmitMouseEnter}
            onMouseLeave={handleSubmitMouseLeave}
          >
            Submit
            <CaretIcon stroke={submitStroke} />
          </Button>
          <p className='text-base font-normal text-black'>
            <span>Or </span>
            <span className='underline'>Browse</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Banner;

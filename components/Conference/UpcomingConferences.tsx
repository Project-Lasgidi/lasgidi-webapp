import { fetchConferences } from '@/actions/conference';
import UpcomingConferencesCarousel from '../Carousel/UpcomingConferencesCarousel';
import { ConferenceCardBig } from './ConferenceCard/Big';

export const UpcomingConferences = async () => {
  const { conferences } = await fetchConferences({});

  if (conferences.length === 0) {
    return null;
  }

  return (
    <section className='relative pt-4 md:mb-24 md:bg-neutral-100 md:pt-16'>
      <UpcomingConferencesCarousel totalSlides={conferences.length}>
        {conferences.map((conference, idx) => (
          <ConferenceCardBig key={idx} conference={conference} />
        ))}
      </UpcomingConferencesCarousel>
    </section>
  );
};

export const UpcomingConferencesLoader = () => (
  <div className='animate-pulse'>
    <section className='relative bg-neutral-100 pt-4 md:mb-24 md:pt-16'>
      <div className='app-container relative flex w-full flex-col overflow-x-hidden overflow-y-hidden md:h-[550px] md:flex-row'>
        <div className='w-full px-4 pb-3 max-md:pt-8 md:w-1/2 md:px-0 md:pb-28 xl:w-2/5'>
          <div className='mb-10 h-6 w-32 rounded-lg bg-neutral-200/50 px-2.5 py-1' />
          <div className='mb-6 h-12 w-96 rounded-lg bg-neutral-200/50' />
          <div className='mb-4 h-6 w-full rounded-lg bg-neutral-200/50 md:w-96' />
          <div className='flex items-center justify-start gap-2'>
            <div className='h-6 w-6 rounded-lg bg-neutral-200/50' />
            <div className='h-6 w-32 rounded-lg bg-neutral-200/50' />
          </div>
          <div className='mt-2 flex items-center justify-start gap-2'>
            <div className='h-6 w-6 rounded-lg bg-neutral-200/50' />
            <div className='h-6 w-32 rounded-lg bg-neutral-200/50' />
          </div>
          <div className='mt-6 flex gap-4'>
            <div className='h-10 w-10 rounded-full bg-neutral-200/50' />
            <div className='flex flex-col items-start justify-start pb-4'>
              <div className='h-6 w-32 rounded-lg bg-neutral-200/50' />
              <div className='mt-2 flex items-center justify-start gap-1'>
                <div className='h-6 w-40 rounded-lg bg-neutral-200/50' />
              </div>
            </div>
          </div>
        </div>
        <div className='h-72 w-full bg-neutral-200/50 md:h-[550px] md:w-1/2 md:rounded-t-2xl xl:w-3/5' />
      </div>
    </section>
  </div>
);

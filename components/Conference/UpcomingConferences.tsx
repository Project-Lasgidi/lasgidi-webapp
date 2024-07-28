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

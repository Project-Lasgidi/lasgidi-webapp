import { fetchCommunities } from '@/actions/community';
import CommunityConferenceList from '@/components/CommunityConferenceList';
import { ConferenceCardBig } from '@/components/Conference/ConferenceCard/Big';
import NavBar from '@/components/NavBar';
import UpcomingConferencesCarousel from '@/components/Carousel';
import { ISearchParams } from '@/types';
import Banner from '../components/Banner';
import { fetchConferences } from '@/actions/conference';

type Props = {
  searchParams?: ISearchParams;
};

export const dynamic = 'force-static';

export default async function Home({ searchParams }: Props) {
  const { communities = [], pagination } = await fetchCommunities({
    searchParams,
  });

  const { conferences = [], pagination: page } = await fetchConferences({
    searchParams,
  });

  return (
    <div id='homepage' className='min-h-screen py-10 lg:py-20'>
      <NavBar />
      <Banner />
      <section className='pt-4 md:mb-24 md:bg-neutral-100 md:pt-16'>
        <UpcomingConferencesCarousel totalSlides={conferences.length}>
          {conferences.map((conference, idx) => (
            <ConferenceCardBig key={idx} conference={conference} />
          ))}
        </UpcomingConferencesCarousel>
      </section>
      <CommunityConferenceList
        searchParams={searchParams as ISearchParams}
        initialCommunities={communities}
        initialConferencies={conferences}
        initialPagination={pagination}
      />
    </div>
  );
}

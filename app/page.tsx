import { CaretIcon } from '@/components/Icons';
import { fetchCommunities } from '@/actions/community';
import CommunityConferenceList from '../components/CommunityConferenceList';
import conferences from '@/data/conferences';
import { ConferenceCardBig } from '@/components/Conference/ConferenceCard/Big';
import NavBar from '@/components/NavBar';

type SearchParams = {
  searchParams?: {
    q?: string;
  };
};

export const dynamic = 'force-static';

export default async function Home({ searchParams }: SearchParams) {
  const query = searchParams?.q || '';
  const { communities, pagination } = await fetchCommunities({
    text: query,
  });

  const conference = conferences[0];

  return (
    <>
      <div className='min-h-screen'>
        <div className='relative h-[500px] w-full bg-hero-image bg-cover bg-no-repeat pb-20 '>
          <NavBar />
          <section className='flex flex-col items-center gap-6 pb-16 pt-20 md:pb-28 md:pt-24'>
            <div className='flex flex-col items-center  gap-4'>
              <p className='text-center text-6xl font-bold text-black'>
                The Lasgidi Project
              </p>
              <p className='normal-text w-3/5 text-center md:w-full'>
                A repository of tech communities, conferences and more.
              </p>
            </div>
            <div className='grid place-items-center gap-6'>
              <button className='flex items-center gap-2 space-x-2 rounded-3xl bg-black px-14 py-3 text-base font-normal text-white md:px-6'>
                Submit
                <CaretIcon />
              </button>
              <p className='text-base font-normal text-black'>
                <span>Or </span>
                <span className='underline'>Browse</span>
              </p>
            </div>
          </section>

          <section className='bg-neutral-100 pt-4 md:mb-24 md:pt-16'>
            <ConferenceCardBig conference={conference} />
          </section>

          <CommunityConferenceList
            text={query}
            initialCommunities={communities}
            initialConferencies={conferences}
            initialPagination={pagination}
          />
        </div>
      </div>
    </>
  );
}

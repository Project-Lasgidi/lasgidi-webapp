import Container from '@/components/Container';
import Image from 'next/image';
import { Member } from './components/Member';
import { TechStack } from './components/TechStack';
import NavBar from '@/components/NavBar';
import Link from 'next/link';
import { TWITTER_URL } from '@/constants/links';

export default function AboutUS() {
  return (
    <>
      <NavBar />
      <Container className='relative bg-white pb-4 pt-8 md:pb-20 md:pt-32'>
        <div className='flex flex-wrap justify-center gap-6'>
          <p className='min-w-fit flex-1 shrink-0 text-left text-5xl font-bold text-black md:text-center lg:text-left'>
            About us
          </p>
          <div className='max-w-md'>
            <p className='normal-text'>
              <span>The idea for Project Lasgidi was born at </span>
              <Link
                href='https://2023.djangocon.africa/'
                target='_blank'
                className='underline'
              >
                DjangoCon Africa 2023
              </Link>
              <span>
                . The idea was simple: Make it possible for people to find
                developer communities to join as well as conferences to attend.
              </span>
            </p>
            <p>
              At every developer conference, new communities and initiatives are
              announced. It’s difficult to keep up. So we created the Project
              Lasgidi to help with that.
            </p>
            <section className='mb-12 mt-2 grid grid-cols-3 gap-4'>
              <Member
                name='Hope Adoli 🇬🇭'
                imgUrl='/images/about-us/hope-adoli.jpg'
                title=' Design / Lead'
              />
              <Member
                name='Derek Duafa 🇬🇭'
                imgUrl='/images/about-us/hope-adoli.jpg'
                title=' Software Engineer'
              />
            </section>
            <TechStack />
            <div>
              <p className='mb-2 text-xl font-bold text-black'>Get in touch</p>
              <p className='normal-text mb-20'>
                <span>
                  Spotted a bug? 🐛 or want to request/suggest a feature or
                  improvement? or want to make a correction? or just want to say
                  hi 👋 ? We’re always happy to hear from you. Send us a DM on
                  Twitter (X){' '}
                </span>
                <Link href={TWITTER_URL} target='_blank' className='underline'>
                  @ProjectLasgidi
                </Link>
              </p>
            </div>
            <div className='relative'>
              <Image
                className='h-32 w-full object-contain'
                src={'/images/lasgidi.svg'}
                alt='Lasgidi image'
                height={0}
                width={0}
              />
              <p className='normal-text absolute bottom-5'>
                another name for Lagos⎯Nigeria’s largest city.
              </p>
            </div>
          </div>
          <div className='hidden flex-1 md:block' />
        </div>
      </Container>
    </>
  );
}

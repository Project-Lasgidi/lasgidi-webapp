'use client';
import { usePathname } from 'next/navigation';
import { useDarkMode } from 'usehooks-ts';

const description = `Project Lasgidi is an Open Source Project built to be the one stop shop for people to find tech communities to join, Open Source Projects to contribute to and upcoming tech conferences to attend.`;
const keywords =
  'Open Source, tech communities, Open Source Projects, upcoming tech conferences, dev conferences,  developer communities';

export const CustomHead = () => {
  const pathname = usePathname();

  const { isDarkMode } = useDarkMode();

  const path: string = pathname ?? '/';
  const Imgs: Record<string, { og: string; title: string }> = {
    '/': {
      og: 'images/ogs/index-og-image.png',
      title: 'Project Lasgidi',
    },
    '/about-us': {
      og: 'images/ogs/index-og-image.png',
      title: 'About Us | Project Lasgidi',
    },
  };
  const pageImage = Imgs[path] ?? {
    og: 'images/ogs/index-og-image.png',
    title: '',
  };

  return (
    <head>
      <title>{pageImage.title}</title>
      <meta title='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href={`/images/${isDarkMode ? 'favicon-light.png' : 'favicon.png'}`}
      />

      <meta name='description' content={description} />
      <meta property='og:url' content='https://lasgidi.xyz' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={pageImage.title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={pageImage.og} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:domain' content='lasgidi.xyz' />
      <meta property='twitter:url' content='https://lasgidi.xyz' />
      <meta name='twitter:title' content={pageImage.title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={pageImage.og} />
    </head>
  );
};

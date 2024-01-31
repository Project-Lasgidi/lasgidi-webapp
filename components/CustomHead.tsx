'use client';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import React from 'react';

export const CustomHead = () => {
  const pathname = usePathname();

  const path: string = pathname ?? '/';
  const Imgs: Record<string, { og: string; title: string }> = {
    '/': {
      og: 'images/ogs/index-og-image.png',
      title: 'Home',
    },
    '/about-us': {
      og: 'images/ogs/index-og-image.png',
      title: 'About Us',
    },
  };
  const pageImage = Imgs[path] ?? {
    og: 'images/ogs/index-og-image.png',
    title: '',
  };
  const title = 'Lasgidi';
  const description = 'A repository of tech communities, conferences and more.';
  return (
    <Head>
      <title>{`Lasgidi - ${pageImage.title}`}</title>
      <meta title='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' type='image/png' sizes='32x32' href={pageImage.og} />

      <meta name='description' content={description} />
      <meta property='og:url' content='https://lasgidi-dev.onrender.com' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content='Portfolio' />
      <meta property='og:image' content={pageImage.og} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:domain' content='lasgidi-dev.onrender.com' />
      <meta property='twitter:url' content='https://lasgidi-dev.onrender.com' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content='undefined' />
      <meta name='twitter:image' content={pageImage.og} />
    </Head>
  );
};

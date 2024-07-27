import localFont from 'next/font/local';

export const sfPro = localFont({
  variable: '--font-sf-pro-display',
  src: [
    {
      path: '../public/fonts/sf-pro-display_regular.woff2',
      // weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

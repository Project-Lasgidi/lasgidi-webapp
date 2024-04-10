import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PropsWithChildren } from '@/types';
import { CustomHead } from '@/components/CustomHead';
import localFont from 'next/font/local';

const sfPro = localFont({
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={`${sfPro.variable} font-customFont`}>
      <CustomHead />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

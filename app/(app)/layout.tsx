import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import { PropsWithChildren } from '@/types';
import localFont from 'next/font/local';
import { Metadata } from 'next';
import { projectInfo } from '@/constants/projectInfo';

const sfPro = localFont({
  variable: '--font-sf-pro-display',
  src: [
    {
      path: '../../public/fonts/sf-pro-display_regular.woff2',
      // weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

const { appUrl, description, keywords, projectTitle } = projectInfo;
export const metadata: Metadata = {
  title: {
    template: `%s | ${projectTitle}`,
    default: projectTitle,
  },
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon-light.png',
        href: '/images/favicon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon.png',
        href: '/images/favicon.png',
      },
    ],
  },
  description,
  metadataBase: new URL(appUrl),
  keywords,
  openGraph: {
    title: projectTitle,
    description,
    url: appUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProjectLasgidi',
    description,
    title: projectTitle,
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={`${sfPro.variable} font-customFont`}>
      {/* <CustomHead /> */}
      <body>
        <main>{children}</main>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={'light'}
          transition={Zoom}
        />
      </body>
    </html>
  );
}

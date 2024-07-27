import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import { PropsWithChildren } from '@/types';
import { Metadata } from 'next';
import { projectInfo } from '@/constants/projectInfo';
import { sfPro } from '@/config/fonts';

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

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import './globals.css';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { Toaster } from '@/components/ui';
import Providers from '@/providers/providers';
import { siteConfig } from './config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  // TODO: uncomment this and replace the logo
  // maybe find one on logo ipsum
  // icons: [
  //   {
  //     url: "/logo.svg",
  //     href: "logo.svg"
  //   }
  // ],
  openGraph: {
    images: [{ url: '/opengraph-image.png' }],
  },
  // twitter: {
  // card: 'summary_large_image',
  // title: siteConfig.name,
  // description: siteConfig.description,
  // images: [{ url: 'https://agI' }],
  // creator: "",
  // },
  metadataBase: new URL('https://task-pilot-five.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen antialiased ${GeistSans.className}`}>
        <Providers>
          {children}
          <TailwindIndicator />
        </Providers>
        {/* <Analytics /> */}
        <Toaster />
      </body>
    </html>
  );
}

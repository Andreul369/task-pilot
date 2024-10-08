import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import './globals.css';

import { NovuProvider } from '@novu/react/hooks';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui';
import { siteConfig } from './config';

export const metadata = {
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
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
        </ThemeProvider>
        {/* <Analytics /> */}
        <Toaster />
      </body>
    </html>
  );
}

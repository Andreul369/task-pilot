import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import './globals.css';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui';

export const metadata = {
  title: {
    // default: siteConfig.name,
    // template: `%s - ${siteConfig.name}`,
  },
  // description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [{ url: '/opengraph-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    // title: siteConfig.name,
    // description: siteConfig.description,
    images: [{ url: 'https://acme-corp-lib.vercel.app/opengraph-image.png' }],
    // creator: "",
  },
  // metadataBase: new URL("https://"),
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

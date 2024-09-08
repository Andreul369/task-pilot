import { Suspense } from 'react';
import Link from 'next/link';

// import { siteConfig } from '~/app/config';
// import { MobileDropdown } from '~/components/mobile-nav';

import * as Icons from '@/components/icons/icons';
import { buttonVariants } from '@/components/ui';

// import { MainNav } from '../(dashboard)/_components/main-nav';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="container z-50 flex h-16 items-center border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">
            {/* {siteConfig.name} */}
            Task Pilot
          </span>
        </div>
        {/* <MobileDropdown /> */}
        {/* <MainNav /> */}
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}

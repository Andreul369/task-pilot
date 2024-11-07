import { Suspense } from 'react';
import Link from 'next/link';

// import { MobileDropdown } from '~/components/mobile-nav';

import * as Icons from '@/components/icons/icons';
import { UserNav } from '@/components/nav/user-nav';
import { buttonVariants, Input } from '@/components/ui';
import { getUser } from '@/utils/supabase/queries';
// import { MainNav } from '../(dashboard)/_components/main-nav';
import { createClient } from '@/utils/supabase/server';

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <nav className="container sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 size-6" />
          <span className="text-lg font-bold tracking-tight">
            {/* {siteConfig.name} */}
            Task Pilot
          </span>
        </div>
        {/* <SidebarWorkspaceMobile /> */}

        <div className="ml-auto flex items-center space-x-4">
          <Suspense>
            <DashboardLink />
          </Suspense>
        </div>
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}

async function DashboardLink() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/signin" className={buttonVariants({ variant: 'outline' })}>
        Sign In
        <Icons.ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    );
  }
  return <UserNav />;
}

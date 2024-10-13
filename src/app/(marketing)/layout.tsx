import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// import { siteConfig } from '~/app/config';
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

        <Link href="/search" className="block md:hidden">
          <Icons.Search className="size-5 text-muted-foreground" />
        </Link>

        <div className="hidden bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
          <form>
            <div className="relative">
              <Icons.Search className="absolute left-2 top-2.5 size-5 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div>
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

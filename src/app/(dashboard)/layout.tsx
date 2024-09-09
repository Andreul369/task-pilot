import Link from 'next/link';

// import { siteConfig } from '~/app/config';
// import { SiteFooter } from '~/components/footer';
// import { MobileDropdown } from '~/components/mobile-nav';

import * as Icons from '@/components/icons/icons';
import SidebarWorkspaceMobile from '@/components/nav/sidebar-workspace-mobile';
import { UserNav } from '@/components/nav/user-nav';
import { Button, buttonVariants, Input } from '@/components/ui';

// import { MainNav } from '../(dashboard)/_components/main-nav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      <nav className="container z-50 flex h-14 items-center justify-between border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 size-6" />
          <span className="text-lg font-bold tracking-tight">
            {/* {siteConfig.name} */}
            Task Pilot
          </span>
        </div>
        <SidebarWorkspaceMobile />

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

        <UserNav />
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}

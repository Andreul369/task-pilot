import Link from 'next/link';
import { Bell } from 'lucide-react';

import { getUserWorkspaces } from '@/actions/workspaces';
// import { siteConfig } from '~/app/config';
// import { SiteFooter } from '~/components/footer';
// import { MobileDropdown } from '~/components/mobile-nav';

import * as Icons from '@/components/icons/icons';
import SidebarWorkspace from '@/components/nav/sidebar-workspace';
import SidebarWorkspaceMobile from '@/components/nav/sidebar-workspace-mobile';
import { UserNav } from '@/components/nav/user-nav';
import { Button, buttonVariants, Input } from '@/components/ui';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { createClient } from '@/utils/supabase/server';
import { siteConfig } from '../config';

// import { MainNav } from '../(dashboard)/_components/main-nav';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const workspaces = await getUserWorkspaces(user.id);

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      <nav className="container z-50 flex h-14 items-center justify-between border-b bg-background">
        <div className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 size-6" />
          <span className="text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </div>
        <SidebarWorkspaceMobile />

        {/* <Link href="/search" className="block md:hidden">
          <Icons.Search className="size-5 text-muted-foreground" />
        </Link> */}

        {/* <div className="hidden bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
          <form>
            <div className="relative">
              <Icons.Search className="absolute left-2 top-2.5 size-5 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form>
        </div> */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <WorkspaceSwitcher workspaces={workspaces} />
          <UserNav />
        </div>
      </nav>

      <main className="flex flex-1">{children}</main>
    </div>
  );
}

import Link from 'next/link';

import { getUserWorkspaces } from '@/actions/workspaces';
import * as Icons from '@/components/icons/icons';
import { NotificationCenter } from '@/components/nav/notification-center';
import SidebarWorkspaceMobile from '@/components/nav/sidebar-workspace-mobile';
import { UserNav } from '@/components/nav/user-nav';
import { Input } from '@/components/ui';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { createClient } from '@/utils/supabase/server';
import { siteConfig } from '../config';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const workspaces = await getUserWorkspaces(user?.id);

  return (
    <>
      <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background">
        <Link href="/" className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 size-6" />
          <span className="text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>
        <SidebarWorkspaceMobile workspaces={workspaces || []} />

        <div className="hidden bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
          {/* <form>
            <div className="relative">
              <Icons.Search className="absolute left-2 top-2.5 size-5 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8" />
            </div>
          </form> */}
        </div>
        <div className="flex items-center gap-4">
          {user && <WorkspaceSwitcher workspaces={workspaces} />}

          <NotificationCenter />
          <UserNav />
        </div>
      </nav>

      <main className="min-h-[calc(100vh-56px)]">{children}</main>
    </>
  );
}

import Link from 'next/link';

import { getUserWorkspaces } from '@/actions/workspaces';
import * as Icons from '@/components/icons/icons';
import { NotificationCenter } from '@/components/nav/notification-center';
import SidebarWorkspaceMobile from '@/components/nav/sidebar-workspace-mobile';
import { UserNav } from '@/components/nav/user-nav';
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
      <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
        <Link href="/" className="mr-8 hidden items-center md:flex">
          <Icons.Logo className="mr-2 size-6" />
          <span className="text-lg font-bold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>
        <SidebarWorkspaceMobile workspaces={workspaces || []} />

        <div className="hidden bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block"></div>
        <div className="flex items-center gap-4">
          {user && <WorkspaceSwitcher workspaces={workspaces} />}

          <NotificationCenter />
          <UserNav user={user} />
        </div>
      </nav>

      <main className="min-h-[calc(100vh-56px)]">{children}</main>
    </>
  );
}

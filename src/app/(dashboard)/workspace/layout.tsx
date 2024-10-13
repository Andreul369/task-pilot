import Link from 'next/link';
import { Bell } from 'lucide-react';

import { getUserWorkspaces } from '@/actions/workspaces';
import { siteConfig } from '@/app/config';
// import { siteConfig } from '~/app/config';
// import { SiteFooter } from '~/components/footer';
// import { MobileDropdown } from '~/components/mobile-nav';

import * as Icons from '@/components/icons/icons';
import SidebarWorkspace from '@/components/nav/sidebar-workspace';
import SidebarWorkspaceMobile from '@/components/nav/sidebar-workspace-mobile';
import { UserNav } from '@/components/nav/user-nav';
import { Button, buttonVariants, Input } from '@/components/ui';
import { WorkspaceSwitcher } from '@/components/workspace-switcher';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

// import { MainNav } from '../(dashboard)/_components/main-nav';

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const user = await getUser(supabase);
  const workspaces = await getUserWorkspaces(user.id);

  return (
    <>
      <SidebarWorkspace workspaces={workspaces} />
      <div className="flex h-full w-full">{children}</div>
    </>
  );
}

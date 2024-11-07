import { getUserWorkspaces } from '@/actions/workspaces';
import SidebarWorkspace from '@/components/nav/sidebar-workspace';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const user = await getUser(supabase);
  const workspaces = await getUserWorkspaces(user.id);

  return (
    <div className="relative flex">
      <SidebarWorkspace workspaces={workspaces} />
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
}

import * as Icons from '@/components/icons/icons';
import SidebarWorkspace from '@/components/nav/sidebar-workspace';
import SidebarWorkspaceMobile from '@/components/nav/sidebar-workspace-mobile';
import Pricing from '@/components/pricing';
import { workspaces } from '@/components/shad-demo/data';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspacePage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  return (
    <div className="flex min-h-screen w-full">
      <SidebarWorkspace />
      <div className="flex flex-1 flex-col">
        <div className="flex h-14 items-center bg-muted/40">
          <h1 className="p-4 text-lg font-semibold md:text-2xl lg:p-6">
            Workspaces
          </h1>
        </div>
        <div className="flex flex-1 flex-col gap-12 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col gap-1">
            <h3 className="flex items-center gap-4 text-2xl font-bold tracking-tight">
              <span>Starred boards</span>
              <Icons.Star className="size-5" />
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <div className="row-wrap flex gap-4">
              <Card className="h-24 w-52 bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Board #1</CardTitle>
                </CardHeader>
              </Card>
              <Card className="h-24 w-52 bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Board #2</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          {workspaces.map((workspace) => (
            <div key={workspace.id} className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold tracking-tight">
                {workspace.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <div className="row-wrap flex gap-4">
                {workspace.boards.map((board) => (
                  <Card key={board.id} className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">{board.name}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
                <Card className="h-24 w-52 bg-muted/40">
                  <CardHeader className="p-3">
                    <CardTitle className="text-lg">Create new board</CardTitle>
                    <CardDescription>7 remaining</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold tracking-tight">
              Guest workspaces
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start selling as soon as you add a product.
            </p>
            <div className="row-wrap flex gap-4">
              <Card className="h-24 w-52 bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Dev Department #3</CardTitle>
                </CardHeader>
              </Card>
              <Card className="h-24 w-52 bg-muted/40">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Sales Department #4</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
          <Pricing
            user={user}
            products={products ?? []}
            subscription={subscription}
          />
        </div>
      </div>
    </div>
  );
}

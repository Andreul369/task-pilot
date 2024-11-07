import Link from 'next/link';

import { AddBoardForm } from '@/components/forms/add-board-form';
import * as Icons from '@/components/icons/icons';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { MAX_FREE_BOARDS } from '@/constants/boards';
import { getAvailableCount } from '@/utils/org-limit';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspacePage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  const { data: workspaces, error } = await supabase
    .from('workspaces')
    .select(`*, boards (*), workspace_limits (count)`)
    .eq('owner_id', user.id);

  if (error) {
    console.error('Error fetching workspaces:', error);
    return <div>Error loading workspaces</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-14 items-center bg-muted/40">
        <h1 className="p-4 text-lg font-semibold md:text-2xl lg:p-6">
          Your Workspaces
        </h1>
      </div>

      {workspaces?.length > 0 &&
        workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="flex flex-col gap-1 p-4 lg:gap-6 lg:p-6"
          >
            <h3 className="text-2xl font-bold tracking-tight">
              {workspace.name}
            </h3>

            <div className="row-wrap flex gap-4">
              {workspace.boards.map((board) => (
                <Link key={board.id} href={`/board/${board.id}`}>
                  <Card
                    className="h-28 w-full cursor-pointer bg-cover bg-center md:w-56"
                    style={{ backgroundImage: `url(${board.image_thumb_url})` }}
                  >
                    <div className="group relative flex h-full w-full flex-col justify-between p-3">
                      <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                      <h4 className="z-10 text-lg font-semibold">
                        {board.title}
                      </h4>
                      <Icons.Star className="z-10 hidden size-4 self-end group-hover:block" />
                    </div>
                  </Card>
                </Link>
              ))}

              <Popover>
                <PopoverTrigger asChild>
                  <Card className="relative h-28 w-full cursor-pointer bg-muted/40 md:w-56">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">
                        Create new board
                      </CardTitle>
                      <CardDescription>
                        {MAX_FREE_BOARDS - workspace.workspace_limits?.count}{' '}
                        remaining
                      </CardDescription>
                    </CardHeader>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icons.Help className="absolute bottom-2 right-2 size-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-56">
                          <p>Free Workspaces can have up to 5 open boards.</p>
                          <p>For unlimited boards upgrade this worskpace.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Card>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80"
                  align="center"
                  side="right"
                  sideOffset={6}
                >
                  <AddBoardForm
                    workspaceId={workspace.id}
                    workspaceLimits={
                      MAX_FREE_BOARDS - workspace.workspace_limits?.count
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}

      <div className="flex flex-col gap-1 p-4 lg:gap-6 lg:p-6">
        <h3 className="text-2xl font-bold tracking-tight">Guest workspaces</h3>
        <div className="row-wrap flex gap-4">
          <Card className="h-28 w-56 bg-muted/40">
            <CardHeader className="p-3">
              <CardTitle className="text-lg">Dev Department #3</CardTitle>
            </CardHeader>
          </Card>
          <Card className="h-28 w-56 bg-muted/40">
            <CardHeader className="p-3">
              <CardTitle className="text-lg">Sales Department #4</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

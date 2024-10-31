import Link from 'next/link';

import { getWorkspaceBoards } from '@/actions/boards';
import { getUserWorkspaces } from '@/actions/workspaces';
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
} from '@/components/ui';
import { MAX_FREE_BOARDS } from '@/constants/boards';
import { getAvailableCount } from '@/utils/org-limit';
import { getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspaceIdPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const supabase = createClient();

  const user = await getUser(supabase);

  const { data } = await supabase
    .from('workspaces')
    .select('name')
    .eq('id', params.workspaceId)
    .single();

  const workspaceName = data?.name;

  const workspaces = await getUserWorkspaces(user.id);
  const workspaceBoards = await getWorkspaceBoards(params.workspaceId);
  const availableCount = await getAvailableCount(params.workspaceId);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-14 items-center bg-muted/40">
        <div className="flex items-center gap-2 px-4 lg:px-6">
          <Icons.Castle className="size-10" />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold md:text-xl ">
              {workspaceName}
            </h1>
            <div className="flex items-center text-xs text-muted-foreground">
              <Icons.CreditCard className="mr-1 size-3" />
              Free
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-12 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 flex-col gap-12">
          {/* //TODO: implement starred boards */}
          {/* <div className="flex flex-col gap-1">
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
          </div> */}
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold tracking-tight">Your boards</h3>
            <div className="row-wrap flex flex-col gap-4 md:flex-row">
              {workspaceBoards?.map((board) => (
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
                  <Card className="h-28 w-full cursor-pointer bg-muted/40 md:w-56">
                    <CardHeader className="p-3">
                      <CardTitle className=" text-center text-lg">
                        Create new board
                      </CardTitle>
                      <CardDescription className="text-center">
                        {MAX_FREE_BOARDS - availableCount} remaining
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80"
                  align="center"
                  side="right"
                  sideOffset={6}
                >
                  <AddBoardForm
                    activeWorkspaceId={params.workspaceId}
                    workspaces={workspaces}
                    workspaceLimits={MAX_FREE_BOARDS - availableCount}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* //TODO: implement guest workspaces */}
          {/* <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold tracking-tight">
              Guest workspaces
            </h3>
            <p className="text-sm text-muted-foreground">
              Workspaces you are a member of.
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

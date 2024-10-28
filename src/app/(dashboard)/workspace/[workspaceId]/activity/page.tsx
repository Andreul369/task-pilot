import { getWorkspaceMembers } from '@/actions/workspaces';
import { InviteTeamMembersForm } from '@/components/forms/invite-team-members-form';
import * as Icons from '@/components/icons/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Dialog,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspaceActivityPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  const workspaceId = params.workspaceId;
  const workspaceMembers = await getWorkspaceMembers(workspaceId);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 self-center p-4">
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2">
            Workspace Activity
          </CardTitle>
          <CardDescription>
            View the activity of your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 p-4 lg:p-6">
          {workspaceMembers?.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={member.user.avatar_url} />
                  <AvatarFallback>
                    {member && getInitials(member.user.full_name)}
                  </AvatarFallback>
                </Avatar>

                <p className="font-medium leading-none">
                  {member.user.full_name} has created a new board.
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

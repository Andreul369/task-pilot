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
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspaceIdPage({
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
    <div className="flex flex-1 flex-col">
      <div className="flex h-14 items-center bg-muted/40">
        <h1 className="p-4 text-lg font-semibold md:text-2xl lg:p-6">
          Workspaces name
        </h1>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Invite new member</Button>
        </DialogTrigger>

        <InviteTeamMembersForm userId={userId} workspaceId={workspaceId} />
      </Dialog>

      <div className="flex flex-1 flex-col gap-12 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-1 flex-col gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Invite your team members to collaborate.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {workspaceMembers?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={member.user.avatar_url} />
                      <AvatarFallback>
                        {member && getInitials(member.user.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {member.user.full_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="ml-auto capitalize">
                        {member.role}{' '}
                        <Icons.ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="end">
                      <Command>
                        <CommandInput placeholder="Select new role..." />
                        <CommandList>
                          <CommandEmpty>No roles found.</CommandEmpty>
                          <CommandGroup className="p-1.5">
                            <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                              <p>Member</p>
                              <p className="text-sm text-muted-foreground">
                                Can view, comment and edit.
                              </p>
                            </CommandItem>
                            <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                              <p>Owner</p>
                              <p className="text-sm text-muted-foreground">
                                Admin-level access to all resources.
                              </p>
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-1">
            <h3 className="flex items-center gap-4 text-2xl font-bold tracking-tight">
              <span>Settings</span>
              <Icons.Settings className="size-5" />
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage organization settings
            </p>
            <div className="flex items-center gap-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Leave Workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Delete Workspace</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

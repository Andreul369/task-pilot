import Link from 'next/link';

import * as Icons from '@/components/icons/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import SignOut from '../forms/AuthForms/sign-out';
import { CreateWorkspaceDialog } from '../forms/create-workspace-form';
import ThemeToggle from '../theme-toggle';

const UserDropdown = ({
  avatarUrl,
  fullName,
  email,
  id,
}: {
  avatarUrl: string;
  fullName: string;
  email: string;
  id: string;
}) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt={fullName ?? ''} />
              <AvatarFallback>
                {fullName && getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/${id}/settings`}>
                <Icons.User className="mr-2 size-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/workspace`}>
                <Icons.Castle className="mr-2 size-4" />
                <span>Workspaces</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-5 w-full flex-1 justify-start px-0 text-sm font-normal"
                >
                  <Icons.PlusCircle className="mr-2 size-4" />
                  New Workspace
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="flex max-w-6xl">
        <CreateWorkspaceDialog userId={id} />
      </DialogContent>
    </Dialog>
  );
};

export default UserDropdown;

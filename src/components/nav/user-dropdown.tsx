import Link from 'next/link';
import { CreditCard, Settings, User } from 'lucide-react';

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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import SignOut from '../forms/AuthForms/sign-out';
import { CreateWorkspaceDialog } from '../forms/create-workspace-form';

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
                <User className="mr-2 size-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
            <DropdownMenuItem asChild>
              <Link href={`/${id}/billing`}>
                <CreditCard className="mr-2 size-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
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

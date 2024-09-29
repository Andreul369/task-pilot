import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  CreditCard,
  LogIn,
  LogOut,
  PlusCircle,
  Settings,
  User,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui';
import { createClient } from '@/utils/supabase/server';
import SignOut from '../forms/AuthForms/sign-out';
import { CreateWorkspaceDialog } from '../forms/create-workspace-form';
import UserDropdown from './user-dropdown';

export async function UserNav() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/signin">
        <Button variant="ghost" className="relative h-8 w-8 rounded">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-transparent">
              <LogIn className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </Link>
    );
  }

  return (
    <UserDropdown
      id={user.id}
      email={user.email!}
      avatarUrl={user.user_metadata.avatar_url}
      fullName={user.user_metadata.full_name}
    />
  );
}

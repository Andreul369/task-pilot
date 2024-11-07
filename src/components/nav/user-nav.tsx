import Link from 'next/link';
import { LogIn } from 'lucide-react';

import { Avatar, AvatarFallback, Button } from '@/components/ui';
import UserDropdown from './user-dropdown';

export async function UserNav({ user }) {
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
      email={user.email}
      avatarUrl={user.user_metadata.avatar_url}
      fullName={user.user_metadata.full_name}
    />
  );
}

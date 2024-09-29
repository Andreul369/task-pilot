import { redirect } from 'next/navigation';

import * as Icons from '@/components/icons/icons';
import { Button } from '@/components/ui';
import { createClient } from '@/utils/supabase/server';

export default function SignOut() {
  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/');
  };

  return (
    <form action={signOut} className="p-0 px-0 py-0">
      <Button
        variant="ghost"
        className="h-5 w-full flex-1 justify-start px-0 text-sm font-normal"
      >
        <Icons.LogOut className="mr-2 size-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
}
{
  /* <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
        <input type="hidden" name="pathName" value={usePathname()} />
          <button type="submit" className={s.link}>
            Sign out
          </button>
      </form> */
}

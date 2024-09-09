import { cookies } from 'next/headers';
import Image from 'next/image';

import { Board } from '@/components/shad-demo/board';
import { accounts, mails } from '@/components/shad-demo/data';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  const layout = cookies().get('react-resizable-panels:layout:mail');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <Board
        accounts={accounts}
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </>
  );
}

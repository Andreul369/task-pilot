import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getBoardListsWithCards } from '@/actions/lists';
import { ListsServer } from '@/components/experiment/server/lists.server';
import { Board } from '@/components/shad-demo/board';
import { accounts } from '@/components/shad-demo/data';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage({
  params,
}: {
  params: { boardId: string };
}) {
  const supabase = createClient();

  const layout = cookies().get('react-resizable-panels:layout:board');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const { data: boardData, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', params.boardId)
    .single();

  const lists = await getBoardListsWithCards(boardData?.id);

  // TODO: check if this is correct, or should it be error.code === '400' ?
  if (error) return notFound();
  return (
    <Board
      accounts={accounts}
      boardData={boardData}
      lists={lists}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
    // <ListsServer boardId={boardData.id} />
  );
}
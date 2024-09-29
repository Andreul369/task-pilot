import { getBoardLists } from '@/actions/lists';
import { createClient } from '@/utils/supabase/server';
import { ListsClient } from '../client/lists.client';
import { ListServer } from './list.server';

export async function ListsServer({ boardId }: { boardId: string }) {
  const supabase = createClient();

  const { data: lists, error } = await supabase
    .from('lists')
    .select('*')
    .eq('board_id', boardId)
    .order('order', { ascending: true });

  return (
    <div className="h-[calc(100vh-112px)]">
      <ListsClient initialData={lists}>
        {lists?.map((list, index) => (
          <ListServer key={list.id} list={list} index={index} />
        ))}
      </ListsClient>
    </div>
  );
}

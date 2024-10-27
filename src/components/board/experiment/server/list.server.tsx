import { Suspense } from 'react';

import { createClient } from '@/utils/supabase/server';
import { ListClient } from '../client/list.client';

interface ListServerProps {
  listId: string;
  index: number;
}

export async function ListServer({ listId, index }: ListServerProps) {
  const supabase = createClient();

  const { data: listData, error: listError } = await supabase
    .from('lists')
    .select('*, cards:cards(*)')
    .eq('id', listId)
    .single();

  if (listError) {
    console.error(listError);
    return <p>Error loading list data. {listError.message}</p>;
  }

  return (
    <Suspense fallback={<p>Loading list...</p>}>
      <ListClient initialData={listData} index={index} />
    </Suspense>
  );
}

import { Suspense } from 'react';

import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/server';
import { ListClient } from '../client/list.client';
import CardServer from './card.server';

interface ListServerProps {
  list: Tables<'lists'>;
  index: number;
}

export async function ListServer({ list, index }: ListServerProps) {
  const supabase = createClient();

  const { data: cards, error: cardError } = await supabase
    .from('cards')
    .select('*')
    .eq('list_id', list.id)
    .order('order', { ascending: true });

  const cardComponents = cards?.map((card, index) => (
    <Suspense key={card.id} fallback={<p>Loading...</p>}>
      <CardServer card={card} index={index} />
    </Suspense>
  ));

  return <ListClient list={list} cards={cards} />;
}

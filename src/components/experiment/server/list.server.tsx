import { getCards } from '@/actions/cards';
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

  const { data: cards, error } = await supabase
    .from('cards')
    .select('*')
    .eq('list_id', list.id)
    .order('order', { ascending: true });

  return (
    <ListClient initialData={list} index={index}>
      {cards?.map((card, index) => (
        <CardServer key={card.id} card={card} index={index} />
      ))}
    </ListClient>
  );
}

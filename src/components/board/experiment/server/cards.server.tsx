import { Suspense } from 'react';

import { createClient } from '@/utils/supabase/server';
import { CardDialog } from '../client/card.client';

interface CardsServerProps {
  listId: string;
}

export async function CardsServer({ listId }: CardsServerProps) {
  const supabase = createClient();

  const { data: cards, error } = await supabase
    .from('cards')
    .select('*')
    .eq('list_id', listId)
    .order('order', { ascending: true });

  if (error) {
    console.error(error);
    return <p>Error loading cards. {error.message}</p>;
  }

  return (
    <>
      {cards?.map((card, index) => (
        <Suspense key={card.id} fallback={<p>Loading card...</p>}>
          <CardDialog initialData={card} index={index} />
        </Suspense>
      ))}
    </>
  );
}

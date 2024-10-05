'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export const getCards = async (listId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('list_id', listId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }
};

export const createCard = async (
  cardTitle: string,
  listId: string,
  pathName: string,
) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    //TODO: can I get rid of this fetch somehow. I only need the biggest order number.
    let { data: biggestOrder } = await supabase
      .from('cards')
      .select('order')
      .eq('list_id', listId)
      .order('order', { ascending: false })
      .limit(1)
      .single();

    const { error: workspaceError } = await supabase.from('cards').insert({
      list_id: listId,
      title: cardTitle,
      description: null,
      order: biggestOrder ? biggestOrder.order + 1 : 1,
      created_at: currentDate,
      updated_at: currentDate,
    });

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : console.log(error);
  }

  redirect(pathName);
};

export const deleteCard = async (cardId: string, pathName: string) => {
  try {
    const supabase = createClient();
    const { error: workspaceError } = await supabase
      .from('cards')
      .delete()
      .eq('id', cardId);

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }

  redirect(pathName);
};

export const updateCardsOrder = async (
  cardsToUpdate: { id: string; list_id: string; order: number }[],
) => {
  const supabase = createClient();

  try {
    // Prepare data for batch update
    const { data, error } = await supabase
      .rpc('update_cards_order', {
        cardstoupdate: cardsToUpdate,
      })
      .select();

    return data;
    if (error) console.log(error);
  } catch (error) {
    console.error('Error updating list order:', error);
  }
};

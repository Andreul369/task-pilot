'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { createAuditLog } from './audit-logs';

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

export const createCard = async (cardTitle: string, listId: string) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    //TODO: can I get rid of this fetch somehow. I only need the biggest order number.
    let { data: biggestOrder } = await supabase
      .from('cards')
      .select('order')
      .eq('list_id', listId)
      .order('order', { ascending: false })
      .single();

    const { data: newCard, error: newCardError } = await supabase
      .from('cards')
      .insert({
        list_id: listId,
        title: cardTitle,
        description: null,
        order: biggestOrder ? biggestOrder.order + 1 : 1,
        created_at: currentDate,
        updated_at: currentDate,
      })
      .select()
      .single();

    if (newCardError) throw newCardError;

    const { data: listData } = await supabase
      .from('lists')
      .select(`board:board_id (workspace_id)`)
      .eq('id', listId)
      .single();

    await createAuditLog({
      workspaceId: listData?.board?.workspace_id,
      action: 'create',
      entityId: newCard.id,
      entityType: 'card',
      entityTitle: cardTitle,
    });
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : console.log(error);
  }
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
    const { data, error } = await supabase.rpc('update_cards_order', {
      cardstoupdate: cardsToUpdate,
    });

    if (error) console.log(error);
    return data;
  } catch (error) {
    console.error('Error updating list order:', error);
  }
};

export const addCardDescription = async (
  cardId: string,
  listId: string,
  description: string,
) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('cards')
      .update({
        description: description,
        updated_at: new Date().toISOString(),
      })
      .eq('id', cardId) // Match the existing card's id
      .select()
      .single();

    if (error) console.log(error);
    return data;
  } catch (error) {
    console.error('Error updating list order:', error);
  }
};

export const upsertCardComment = async (
  commentId: string | undefined,
  cardId: string,
  comment: string,
  userId: string,
) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('card_comments')
      .upsert(
        {
          id: commentId || undefined, // If id exists, it will update; if not, it will insert
          card_id: cardId,
          comment,
          user_id: userId,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'id', // Specify which column determines if we update
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (error) throw error;
    return { data };
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error managing card comment' };
  }
};

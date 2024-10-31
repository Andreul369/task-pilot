'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/server';
import { createAuditLog } from './audit-logs';

export const getBoardListsWithCards = async (boardId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('lists')
      .select('*, cards(*)')
      .eq('board_id', boardId)
      .order('order', { ascending: true });
    // .order('cards.order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }
};

export const createList = async (listTitle: string, boardId: string) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    //TODO: can I get rid of this fetch somehow. I only need the biggest order number.
    let { data: biggestOrder } = await supabase
      .from('lists')
      .select('order')
      .eq('board_id', boardId)
      .order('order', { ascending: false })
      .limit(1)
      .single();

    const { data: newList, error: newListError } = await supabase
      .from('lists')
      .insert({
        board_id: boardId,
        title: listTitle,
        order: biggestOrder ? biggestOrder.order + 1 : 1,
        created_at: currentDate,
        updated_at: currentDate,
      })
      .select()
      .single();

    const { data: listData } = await supabase
      .from('lists')
      .select(`board:board_id (workspace_id)`)
      .eq('id', newList.id)
      .single();

    await createAuditLog({
      workspaceId: listData?.board?.workspace_id,
      action: 'create',
      entityId: newList.id,
      entityType: 'list',
      entityTitle: listTitle,
    });

    if (newListError) throw newListError;
    return newList;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }
};

export const duplicateList = async (
  listId: string,
  listTitle: string,
  boardId: string,
  pathName: string,
) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    let { data: listToDuplicate, error } = await supabase
      .from('lists')
      .select('*')
      .eq('id', listId)
      .eq('board_id', boardId)
      .single();

    const { error: updateError } = await supabase.rpc('increment_list_order', {
      p_board_id: boardId,
      p_list_order: listToDuplicate?.order + 1,
    });

    if (!updateError) {
      const { data: newList, error: newListError } = await supabase
        .from('lists')
        .insert({
          board_id: boardId,
          title: `${listTitle} - Copy`,
          order: listToDuplicate.order + 1,
          created_at: currentDate,
          updated_at: currentDate,
        });

      if (newListError) throw newListError;
    }
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }
  revalidatePath(pathName);
};

export const updateListTitle = async (
  listId: string,
  listTitle: string,
  pathName: string,
) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    const { error: listError } = await supabase
      .from('lists')
      .update({ title: listTitle, updated_at: currentDate })
      .eq('id', listId);

    if (listError) throw listError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from updateListTitle.' };
  }
  revalidatePath(pathName);
};

export const deleteList = async (
  listId: string,
  boardId: string,
  pathName: string,
) => {
  try {
    const supabase = createClient();
    const { error: workspaceError } = await supabase
      .from('lists')
      .delete()
      .eq('id', listId)
      .eq('board_id', boardId);

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }
  revalidatePath(pathName);
};

export const updateListsOrder = async (
  listsToUpdate: { id: string; board_id: string; order: number }[],
) => {
  const supabase = createClient();

  try {
    // Prepare data for batch update
    const { data, error } = await supabase.rpc('update_lists_order', {
      liststoupdate: listsToUpdate,
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error updating list order:', error);
  }
};

'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export const getWorkspaceBoards = async (workspaceId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('workspace_id', workspaceId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }
};

export const createBoard = async (
  boardTitle: string,
  workspaceId: string,
  imageId: string,
  imageThumb: string,
  imageFull: string,
  pathName: string,
) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    const { data, error } = await supabase
      .from('boards')
      .insert({
        title: boardTitle,
        workspace_id: workspaceId,
        image_id: imageId,
        image_thumb_url: imageThumb,
        image_full_url: imageFull,
        created_at: currentDate,
        updated_at: currentDate,
      })
      .select('id') // specify the column you want returned
      .single();

    // If there was an error inserting the row, throw the error.
    if (error) throw error;
    // If not, the id of the inserted row.
    return data.id;
  } catch (error) {
    // If there was an error, return it in a standard format.
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from createBoard.' };
  }
};

export const updateBoardTitle = async (
  boardId: string,
  boardTitle: string,
  pathName: string,
) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    const { error: boardError } = await supabase
      .from('boards')
      .update({ title: boardTitle, updated_at: currentDate })
      .eq('id', boardId);

    if (boardError) throw boardError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from updateBoardTitle.' };
  }

  redirect(pathName);
};

export const deleteBoard = async (boardId: string, pathName: string) => {
  try {
    const supabase = createClient();
    const { error: workspaceError } = await supabase
      .from('boards')
      .delete()
      .eq('id', boardId);

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from deleteBoard.' };
  }

  redirect(pathName);
};

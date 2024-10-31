'use server';

import { redirect } from 'next/navigation';

import {
  decreaseWorkspaceBoardLimit,
  hasAvailableBoardSlots,
  incrementWorkspaceBoardLimit,
} from '@/utils/org-limit';
import { createClient } from '@/utils/supabase/server';
import { createAuditLog } from './audit-logs';

export const getWorkspaceBoards = async (workspaceId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('workspace_id', workspaceId);

    if (error) throw error;
    return data;
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
) => {
  try {
    const supabase = createClient();
    // check if the workspace has available board slots
    const canCreate = await hasAvailableBoardSlots(workspaceId);

    if (!canCreate) {
      throw new Error(
        'You have reached your limit of free boards. Please upgrade to create more.',
      );
    }

    const { data: newBoard, error: newBoardError } = await supabase
      .from('boards')
      .insert({
        title: boardTitle,
        workspace_id: workspaceId,
        image_id: imageId,
        image_thumb_url: imageThumb,
        image_full_url: imageFull,
      })
      .select()
      .single();

    // If there was an error inserting the row, throw the error.
    if (newBoardError) throw newBoardError;

    await incrementWorkspaceBoardLimit(workspaceId);

    await createAuditLog({
      workspaceId: workspaceId,
      action: 'create',
      entityId: newBoard.id,
      entityType: 'board',
      entityTitle: boardTitle,
    });

    // If not, the id of the inserted row.
    return newBoard;
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

export const deleteBoard = async (
  boardId: string,
  workspaceId: string,
  boardTitle: string,
  // pathName: string,
) => {
  const supabase = createClient();

  try {
    // Start a transaction by using .from() multiple times
    const { error: boardError } = await supabase
      .from('boards')
      .delete()
      .eq('id', boardId);

    if (boardError) throw boardError;

    // Decrease the workspace board limit
    await decreaseWorkspaceBoardLimit(workspaceId);

    // Create audit log for the deletion
    await createAuditLog({
      workspaceId: workspaceId,
      action: 'delete',
      entityId: boardId,
      entityType: 'board',
      entityTitle: boardTitle,
    });

    // redirect(pathName);
  } catch (error) {
    console.error('Error deleting board:', error);
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error deleting board' };
  }
};

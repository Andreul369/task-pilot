'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export const getUserWorkspaces = async (userId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.rpc('get_user_workspaces', {
      user_id: userId,
    });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getUserWorkspaces.' };
  }
};

export const insertWorkspace = async (
  userId: string,
  name: string,
  pathName: string,
) => {
  try {
    const currentDate = new Date().toISOString();
    const supabase = createClient();
    const { error: workspaceError } = await supabase.from('workspaces').insert({
      owner_id: userId,
      name: name,
      created_at: currentDate,
      updated_at: currentDate,
    });

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error inserting new workspace.' };
  }

  redirect(pathName);
};

export const deleteWorkspace = async (
  workspaceId: string,
  pathName: string,
) => {
  try {
    const supabase = createClient();
    const { error: workspaceError } = await supabase
      .from('workspaces')
      .delete()
      .eq('id', workspaceId);

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }

  redirect(pathName);
};

export const getWorkspaceMembers = async (workspaceId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('workspace_members')
      .select('*, user:member_id (*)')
      .eq('workspace_id', workspaceId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getUserWorkspaces.' };
  }
};

export const deleteList = async (listId: string, pathName: string) => {
  try {
    const supabase = createClient();
    const { error: workspaceError } = await supabase
      .from('lists')
      .delete()
      .eq('id', listId);

    if (workspaceError) throw workspaceError;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getWorkspaceBoards.' };
  }

  redirect(pathName);
};

import { MAX_FREE_BOARDS } from '@/constants/boards';
import { createClient } from '@/utils/supabase/server';

export const incrementWorkspaceBoardLimit = async (workspaceId: string) => {
  try {
    const supabase = createClient();
    const { data: workspaceLimit, error } = await supabase
      .from('workspace_limits')
      .select('*')
      .eq('workspace_id', workspaceId)
      .single();

    if (error) throw error;

    if (workspaceLimit) {
      const { data: newWorkspaceLimit, error: newWorkspaceLimitError } =
        await supabase
          .from('workspace_limits')
          .update({ count: workspaceLimit.count + 1 })
          .eq('workspace_id', workspaceId)
          .select()
          .single();

      if (newWorkspaceLimitError) throw newWorkspaceLimitError;

      return newWorkspaceLimit;
    } else {
      await supabase.from('workspace_limits').insert({
        workspace_id: workspaceId,
        count: 1,
      });
    }
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from incrementWorkspaceBoardLimit.' };
  }
};

export const decreaseWorkspaceBoardLimit = async (workspaceId: string) => {
  try {
    const supabase = createClient();
    const { data: workspaceLimit, error } = await supabase
      .from('workspace_limits')
      .select('*')
      .eq('workspace_id', workspaceId)
      .single();

    if (error) throw error;

    if (workspaceLimit) {
      const { data: newWorkspaceLimit, error: newWorkspaceLimitError } =
        await supabase
          .from('workspace_limits')
          .update({
            count: workspaceLimit.count > 0 ? workspaceLimit.count - 1 : 0,
          })
          .eq('workspace_id', workspaceId)
          .select()
          .single();

      if (newWorkspaceLimitError) throw newWorkspaceLimitError;

      return newWorkspaceLimit;
    } else {
      await supabase.from('workspace_limits').insert({
        workspace_id: workspaceId,
        count: 1,
      });
    }
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from decreaseWorkspaceBoardLimit.' };
  }
};

export const hasAvailableBoardSlots = async (workspaceId: string) => {
  try {
    const supabase = createClient();
    const { data: availableBoardLimit, error } = await supabase
      .from('workspace_limits')
      .select('*')
      .eq('workspace_id', workspaceId)
      .single();

    if (error) throw error;

    if (!availableBoardLimit || availableBoardLimit.count < MAX_FREE_BOARDS) {
      return true;
    } else return false;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from hasAvailableBoardSlots.' };
  }
};

export const getAvailableCount = async (workspaceId: string) => {
  try {
    const supabase = createClient();
    const { data: availableCount, error } = await supabase
      .from('workspace_limits')
      .select('count')
      .eq('workspace_id', workspaceId)
      .single();

    if (error) throw error;

    if (!availableCount) return 0;
    return availableCount.count;
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from hasAvailableBoardSlots.' };
  }
};

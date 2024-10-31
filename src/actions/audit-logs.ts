'use server';

import { createClient } from '@/utils/supabase/server';

interface CreateAuditLogProps {
  workspaceId: string;
  action: string;
  entityId: string;
  entityType: string;
  entityTitle: string;
}

export const getAuditLogs = async (workspaceId: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('workspace_id', workspaceId);

    // If there was an error inserting the row, throw the error.
    if (error) throw error;

    return data;
  } catch (error) {
    // If there was an error, return it in a standard format.
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from createAuditLog.' };
  }
};

export const createAuditLog = async (props: CreateAuditLogProps) => {
  try {
    const supabase = createClient();
    const { workspaceId, action, entityId, entityType, entityTitle } = props;
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        workspace_id: workspaceId,
        action: action,
        entity_id: entityId,
        entity_type: entityType,
        entity_title: entityTitle,
        user_id: user?.id,
        user_image: user?.user_metadata.avatar_url,
        user_name: user?.user_metadata.full_name,
        created_at: new Date().toISOString(),
      })
      .single();

    // If there was an error inserting the row, throw the error.
    if (error) throw error;

    return data;
  } catch (error) {
    // If there was an error, return it in a standard format.
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from createAuditLog.' };
  }
};

'use server';

import { createClient } from '@/utils/supabase/server';

export const getComments = async (cardId: string) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('card_comments')
      .select('*')
      .eq('card_id', cardId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    return error instanceof Error
      ? { error: error.message }
      : { error: 'Error from getComments.' };
  }
};

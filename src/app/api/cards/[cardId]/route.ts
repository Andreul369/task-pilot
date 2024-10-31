import { NextResponse } from 'next/server';

import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/server';

interface CardWithRelations extends Tables<'cards'> {
  list: Pick<Tables<'lists'>, 'title'> & {
    board: Pick<Tables<'boards'>, 'workspace_id'>;
  };
}

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } },
) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { data: cardData, error: cardError } = await supabase
      .from('cards')
      .select(`*, list:list_id (title, board:board_id (workspace_id))`)
      .eq('id', params.cardId)
      .returns<CardWithRelations>()
      .single();

    if (cardError) {
      return new NextResponse(
        cardError.code === 'PGRST116'
          ? 'Card not found'
          : 'Error fetching card',
        { status: cardError.code === 'PGRST116' ? 404 : 500 },
      );
    }

    const card = cardData as CardWithRelations;
    // Check if user is a member of the workspace
    const { data: membership, error: membershipError } = await supabase
      .from('workspace_members')
      .select('id')
      .eq('workspace_id', card.list.board.workspace_id)
      .eq('user_id', user.id)
      .single();

    if (membershipError || !membership) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('[CARD_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

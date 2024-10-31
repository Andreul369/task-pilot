import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } },
) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { data: auditLogs, error: auditLogsError } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('entity_id', params.cardId)
      .eq('entity_type', 'card')
      .order('created_at', { ascending: false })
      .limit(10);

    if (auditLogsError) {
      return new NextResponse(
        auditLogsError.code === 'PGRST116'
          ? 'Card not found'
          : 'Error fetching card',
        { status: auditLogsError.code === 'PGRST116' ? 404 : 500 },
      );
    }
    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

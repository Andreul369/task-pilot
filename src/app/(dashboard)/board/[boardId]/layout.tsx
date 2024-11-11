import { createClient } from '@/utils/supabase/server';

export default async function BoardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { boardId: string };
}>) {
  const supabase = createClient();
  const { data: boardData, error } = await supabase
    .from('boards')
    .select('*')
    .eq('id', params.boardId)
    .single();

  return (
    <div
      className="relative h-[calc(100vh-3.5rem)] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${boardData?.image_full_url})` }}
    >
      {children}
    </div>
  );
}

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
      className="relative flex min-h-[calc(100vh-56px)] flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${boardData?.image_full_url})` }}
    >
      {children}
    </div>
  );
}

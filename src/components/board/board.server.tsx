// import { deleteBoard } from '@/actions/boards';
import { UpdateBoardTitleForm } from '@/components/forms/board-title-form';
import * as Icons from '@/components/icons/icons';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { createClient } from '@/utils/supabase/server';
import { BoardClient } from './board.client';

export async function BoardServer({ boardId }: { boardId: string }) {
  const supabase = createClient();

  const { data: boardData, error: boardError } = await supabase
    .from('boards')
    .select('*')
    .eq('id', boardId)
    .single();

  const { data: listsData, error: listsError } = await supabase
    .from('lists')
    .select('*, cards:cards(id, list_id, title, order)')
    .eq('board_id', boardId)
    .order('order', { ascending: true });

  if (boardError) {
    console.error(boardError);
    return <p>Error loading list data. {boardError.message}</p>;
  }

  if (listsError) {
    console.error(listsError);
    return <p>Error loading list data. {listsError.message}</p>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full items-center justify-between bg-black/25 px-4 py-2 backdrop-blur-sm">
        <div className="flex w-full items-center justify-start gap-4">
          <UpdateBoardTitleForm
            boardId={boardData.id}
            boardTitle={boardData.title}
          />

          <Button variant="ghost" className="text-white">
            <Icons.Star className="size-4" />
          </Button>
          <Button variant="ghost" className="text-white">
            <Icons.Users className="size-4" />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="flex size-8 p-0 data-[state=open]:bg-muted"
            >
              <Icons.DotsHorizontal className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* <DropdownMenuItem
             onClick={async () => {
               await deleteBoard(
                 boardData.id,
                 boardData.workspace_id,
                 boardData.title,
                 // pathName,
               );
             }}
           >
             Delete
           </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <BoardClient initialData={listsData} />
    </div>
  );
}

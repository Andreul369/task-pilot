'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import { deleteList, duplicateList } from '@/actions/lists';
import { AddCardForm } from '@/components/forms/add-card-form';
import { UpdateListTitleForm } from '@/components/forms/list-title-form';
import * as Icons from '@/components/icons/icons';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { Tables } from '@/types/types_db';

interface ListClientProps {
  list: Tables<'lists'> & { cards: Tables<'cards'>[] };
  index: number;
}

export function ListClient({
  children,
  listId,
  listTitle,
  index,
}: ListClientProps) {
  const { boardId } = useParams<{ boardId: string }>();
  const pathName = usePathname();
  // const [orderedCards, setOrderedCards] = useState(cards);

  // useEffect(() => {
  //   setOrderedCards(cards);
  // }, [list]);

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-72 self-start bg-card/90"
        >
          <CardHeader className="flex-row items-center justify-between p-2">
            <CardTitle className="text-base font-normal">
              <UpdateListTitleForm listId={listId} listTitle={listTitle} />
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Icons.DotsHorizontal className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  onClick={async () =>
                    await duplicateList(listId, listTitle, boardId, pathName)
                  }
                >
                  Copy list
                </DropdownMenuItem>
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () =>
                    await deleteList(listId, boardId, pathName)
                  }
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <Droppable droppableId={listId} type="card" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <CardContent className="flex w-full flex-col gap-2 p-2">
                  {/* {orderedCards?.map((card, index) => (
                    <CardDialog
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      index={index}
                      cardDescription={card.description}
                    />
                  ))} */}
                  {children}

                  {provided.placeholder}
                </CardContent>
                {/* 👇 add-card-form-container is used for closing form on click
              outside */}
                <CardFooter className="add-card-form-container w-full p-2">
                  <AddCardForm listId={listId} />
                </CardFooter>
              </div>
            )}
          </Droppable>
        </Card>
      )}
    </Draggable>
  );
}

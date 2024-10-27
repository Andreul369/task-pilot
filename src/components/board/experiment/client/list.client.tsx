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
import { CardDialog } from './card.client';

interface ListClientProps {
  initialData: Tables<'lists'>;
  children?: React.ReactNode;
  index: number;
}

export function ListClient({ children, initialData, index }: ListClientProps) {
  const pathName = usePathname();
  // const [list, setList] = useState(initialData);

  // useEffect(() => {
  //   setList(initialData);
  // }, [initialData]);
  return (
    <Draggable key={initialData.id} draggableId={initialData.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="self-start"
        >
          <Card className="w-72 self-start bg-card/90">
            <CardHeader className="flex-row items-center justify-between p-2">
              <CardTitle className="text-base font-normal">
                <UpdateListTitleForm
                  listId={initialData.id}
                  listTitle={initialData.title}
                />
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
                      await duplicateList(
                        initialData.id,
                        initialData.title,
                        initialData.board_id,
                        pathName,
                      )
                    }
                  >
                    Copy list
                  </DropdownMenuItem>
                  <DropdownMenuItem>Favorite</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () =>
                      await deleteList(
                        initialData.id,
                        initialData.board_id,
                        pathName,
                      )
                    }
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <Droppable
              droppableId={initialData.id}
              type="card"
              direction="vertical"
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <CardContent className="flex w-full flex-col gap-2 p-2">
                    {initialData?.cards?.map((card, index) => (
                      <CardDialog
                        key={card.id}
                        initialData={card}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </CardContent>
                  {/* 👇 add-card-form-container is used for closing form on click
              outside */}
                  <CardFooter className="add-card-form-container w-full p-2">
                    <AddCardForm listId={initialData.id} />
                  </CardFooter>
                </div>
              )}
            </Droppable>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

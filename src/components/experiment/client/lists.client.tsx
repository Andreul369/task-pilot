'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { updateCardsOrder } from '@/actions/cards';
import { updateListsOrder } from '@/actions/lists';
import { AddListForm } from '@/components/forms/add-list-form';
import { ScrollArea, ScrollBar } from '@/components/ui';
import { Tables } from '@/types/types_db';

// import { List } from './list';

interface ListsClientProps {
  // TODO: | null shouldn't be here. Fix the types
  initialData: Tables<'lists'>[] | null;
  children?: React.ReactNode;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function ListsClient({ children, initialData }: ListsClientProps) {
  const [orderedLists, setOrderedLists] = useState(initialData);

  useEffect(() => {
    setOrderedLists(initialData);
  }, [initialData]);

  const onDragEnd = useCallback(
    async (result: any) => {
      const { destination, source, type } = result;

      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // on list order change
      if (type === 'list') {
        const newOrderedLists = reorder(
          orderedLists,
          source.index,
          destination.index,
        ).map((item, index) => ({ ...item, order: index }));
        const listsToUpdate = newOrderedLists.map(
          ({ id, board_id, order }) => ({
            id,
            board_id,
            order,
          }),
        );
        setOrderedLists(newOrderedLists);

        await updateListsOrder(listsToUpdate);
      }

      // on card order change
      if (type === 'card') {
        const newOrderedLists = [...orderedLists];
        const sourceList = newOrderedLists.find(
          (list) => list.id === source.droppableId,
        );
        const destinationList = newOrderedLists.find(
          (list) => list.id === destination.droppableId,
        );

        if (!destinationList || !sourceList) return;

        // Moving cards within the same list
        if (destination.droppableId === source.droppableId) {
          const cards = reorder(
            sourceList.cards,
            source.index,
            destination.index,
          ).map((card, index) => ({ card, order: index }));

          // TODO: UI does not update when changing cards in the same list
          sourceList.cards = cards;
          await updateCardsOrder(sourceList.cards);
        } else {
          const [movedCard] = sourceList.cards.splice(source.index, 1);

          movedCard.list_id = destinationList.id;
          destinationList.cards.splice(destination.index, 0, movedCard);

          sourceList.cards.forEach((card, idx) => (card.order = idx));
          destinationList.cards.forEach((card, idx) => (card.order = idx));
          await updateCardsOrder([
            ...sourceList.cards,
            ...destinationList.cards,
          ]);
        }
        setOrderedLists(newOrderedLists);
      }
    },
    [orderedLists],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="add-list-form-container flex w-max gap-3 p-4"
          >
            {children}
            {/* {orderedLists?.map((list, index) => (
              <List key={list.id} list={list} index={index} />
            ))} */}
            {provided.placeholder}
            <AddListForm />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

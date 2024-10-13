'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { updateCardsOrder } from '@/actions/cards';
import { updateListsOrder } from '@/actions/lists';
import { AddListForm } from '@/components/forms/add-list-form';
import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { ListClient } from './list.client';

interface ListsClientProps {
  initialData: (Tables<'lists'> & { cards: Tables<'cards'>[] })[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function BoardClient({ initialData }: ListsClientProps) {
  const supabase = createClient();
  const { boardId } = useParams<{ boardId: string }>();
  const [orderedLists, setOrderedLists] = useState(initialData);
  useEffect(() => {
    const channel = supabase
      .channel('realtime_lists')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'lists',
          filter: `board_id=eq.${boardId}`,
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              {
                setOrderedLists((prevLists) => [...prevLists, payload.new]);
              }
              break;
            case 'UPDATE':
              {
                setOrderedLists((prevLists) =>
                  prevLists
                    .map((list) =>
                      list.id === payload.old.id
                        ? { ...list, order: payload.new.order }
                        : list,
                    )
                    .sort((a, b) => a.order - b.order),
                );
              }
              break;
            default:
              break;
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    const channel = supabase
      .channel('realtime_cards')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cards',
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              {
                setOrderedLists((prevLists) => {
                  return prevLists.map((list) => {
                    if (list.id === payload.new.list_id) {
                      return {
                        ...list,
                        cards: [...(list.cards || []), payload.new],
                      };
                    }
                    return list;
                  });
                });
              }
              break;
            case 'UPDATE':
              {
                setOrderedLists((prevLists) => {
                  return prevLists.map((list) => {
                    // When moving the card to the new list
                    if (list.id === payload.new.list_id) {
                      return {
                        ...list,
                        cards: [
                          ...list.cards.filter(
                            (card) => card.id !== payload.old.id,
                          ), // Ensure the card from the old list is removed
                          {
                            ...payload.new,
                            // Add the moved card with its new details
                          },
                        ],
                      };
                    }

                    // When removing the card from the old list
                    if (list.id === payload.old.list_id) {
                      return {
                        ...list,
                        cards: list.cards.filter(
                          (card) => card.id !== payload.old.id,
                        ),
                      };
                    }

                    // Return unchanged lists
                    return list;
                  });
                });
              }
              break;
            default:
              break;
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

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
          ).map((card, index) => ({ ...card, order: index }));

          // when there was an error, this was sourcelist.cards = cards
          sourceList.cards = [...cards];
          setOrderedLists(newOrderedLists);
          await updateCardsOrder(sourceList.cards);
        } else {
          const [movedCard] = sourceList.cards.splice(source.index, 1);

          movedCard.list_id = destinationList.id;
          destinationList.cards.splice(destination.index, 0, movedCard);

          sourceList.cards.forEach((card, idx) => (card.order = idx));
          destinationList.cards.forEach((card, idx) => (card.order = idx));
          setOrderedLists(newOrderedLists);
          await updateCardsOrder([
            ...sourceList.cards,
            ...destinationList.cards,
          ]);
        }
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
            {orderedLists.map((list, index) => (
              <ListClient key={list.id} initialData={list} index={index} />
            ))}
            {provided.placeholder}
            <AddListForm />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

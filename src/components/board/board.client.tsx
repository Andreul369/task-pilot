'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { updateCardsOrder } from '@/actions/cards';
import { updateListsOrder } from '@/actions/lists';
import { AddListForm } from '@/components/forms/add-list-form';
import { Tables } from '@/types/types_db';
import { createClient } from '@/utils/supabase/client';
import { ListClient } from './list.client';

interface BoardClientProps extends Tables<'lists'> {
  initialData: Pick<Tables<'cards'>, 'id' | 'list_id' | 'title' | 'order'>[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function BoardClient({ initialData }: BoardClientProps) {
  const supabase = createClient();
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
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              {
                setOrderedLists((prevLists) => [
                  ...prevLists,
                  {
                    id: payload.new.id,
                    title: payload.new.title,
                    order: payload.new.order,
                    list_id: payload.new.list_id,
                    cards: [],
                  },
                ]);
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
            case 'DELETE':
              {
                setOrderedLists((prevLists) =>
                  prevLists.filter((list) => list.id !== payload.old.id),
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
                  // Batch all updates by list
                  return prevLists.map((list) => {
                    // If this is either the source or destination list
                    if (
                      list.id === payload.new.list_id ||
                      list.id === payload.old.list_id
                    ) {
                      // Remove card if it's moving from this list
                      const filteredCards = list.cards.filter(
                        (card) => card.id !== payload.new.id,
                      );

                      // Add card if this is the destination list
                      if (list.id === payload.new.list_id) {
                        filteredCards.push({
                          ...payload.new,
                          list_id: payload.new.list_id,
                          order: payload.new.order,
                        });
                      }

                      // Sort cards by order
                      const sortedCards = filteredCards.sort(
                        (a, b) => a.order - b.order,
                      );

                      return {
                        ...list,
                        cards: sortedCards,
                      };
                    }
                    return list;
                  });
                });
              }
              break;
            case 'DELETE':
              {
                setOrderedLists((prevLists) =>
                  prevLists.map((list) => {
                    return {
                      ...list,
                      cards: list.cards.filter(
                        (card) => card.id !== payload.old.id,
                      ),
                    };
                  }),
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

  const onDragEnd = useCallback(
    async (result: any) => {
      const { destination, source, type } = result;

      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
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
        // Update local state immediately
        setOrderedLists(newOrderedLists);
        const listsToUpdate = newOrderedLists.map(
          ({ id, board_id, order }) => ({
            id,
            board_id,
            order,
          }),
        );

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
      }
    },
    [orderedLists],
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      id="board-scroll-container"
      className="flex-1 overflow-x-auto overflow-y-hidden"
      onMouseDown={(e) => {
        // Prevent default behavior to avoid text selection
        e.preventDefault();

        // Only handle drag if clicking directly on this container
        if (e.target === e.currentTarget) {
          const element = scrollContainerRef.current;
          if (!element) return;

          let startX = e.clientX;
          let scrollLeft = element.scrollLeft;

          const handleMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            if (!element) return;

            const dx = e.clientX - startX;
            element.scrollLeft = scrollLeft - dx;
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (element) element.style.cursor = 'grab';
          };

          element.style.cursor = 'grabbing';
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }
      }}
      style={{ cursor: 'grab' }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="add-list-form-container flex gap-3 p-4"
            >
              {orderedLists.map((list, index) => (
                <ListClient key={list.id} initialData={list} index={index} />
              ))}
              {provided.placeholder}
              <AddListForm />
              {/* 👇` marks the end of the container. */}
              <div className="w-1 flex-shrink-0" />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

'use client';

import { Draggable } from '@hello-pangea/dnd';

import { buttonVariants } from '@/components/ui';
import { Tables } from '@/types/types_db';
import { cn } from '@/utils/cn';
import useCardModalStore from '@/zustand/use-card-modal';

interface CardDialogProps {
  initialData: Tables<'cards'>;
  index: number;
}

export function CardDialog({ initialData, index }: CardDialogProps) {
  const cardModalStore = useCardModalStore();

  return (
    <Draggable draggableId={initialData.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role={'button'}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'justify-start ',
          )}
          onClick={() => cardModalStore.onOpen(initialData.id)}
        >
          {initialData.title}
        </div>
      )}
    </Draggable>
  );
}

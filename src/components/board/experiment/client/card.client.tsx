'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Draggable } from '@hello-pangea/dnd';
import parse from 'html-react-parser';

import { getComments } from '@/actions/comments';
import * as Icons from '@/components/icons/icons';
import { LexicalEditor } from '@/components/lexical/lexical-editor';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  buttonVariants,
} from '@/components/ui';
import { useSession } from '@/hooks/use-session';
import { Tables } from '@/types/types_db';
import { cn } from '@/utils/cn';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

interface CardDialogProps {
  initialData: Tables<'cards'>;
  index: number;
}

export function CardDialog({ initialData, index }: CardDialogProps) {
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { session } = useSession();

  useEffect(() => {
    async function fetchComments() {
      const comments = await getComments(initialData.id);
      console.log('Comments for card:', comments);
    }

    fetchComments();
  }, [initialData.id]);

  return (
    <Draggable draggableId={initialData.id} index={index}>
      {(provided) => (
        <Dialog>
          <DialogTrigger asChild>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'justify-start ',
              )}
            >
              {initialData.title}
            </div>
          </DialogTrigger>
          <DialogContent className="flex max-w-[768px] flex-col space-y-4">
            <DialogHeader>
              <DialogTitle className="relative ml-10 flex items-center justify-start gap-2">
                <Icons.Captions className="absolute -left-9 size-6" />
                {initialData.title}
              </DialogTitle>
              <DialogDescription className="ml-10">
                in list{' '}
                <Link href="#" className="underline">
                  listName
                </Link>
              </DialogDescription>
            </DialogHeader>
            <div className="relative ml-10">
              <Icons.AlignLeft className="absolute -left-9 size-6" />
              <h3 className="font-semibold tracking-tight">Description</h3>
            </div>
            {showDescriptionForm ? (
              <div className="ml-10">
                <LexicalEditor
                  className="mb-4"
                  cardId={initialData.id}
                  listId={initialData.list_id}
                  initialContent={initialData.description}
                  onCancel={() => setShowDescriptionForm(false)}
                  mode="description"
                />
              </div>
            ) : initialData.description ? (
              <div
                className="ml-10 cursor-pointer"
                onClick={() => setShowDescriptionForm(true)}
              >
                {parse(initialData.description)}
              </div>
            ) : (
              <Button
                variant="ghost"
                className="ghost ml-10 h-14 justify-start bg-muted px-2"
                onClick={() => setShowDescriptionForm(true)}
              >
                Add a more detailed description...
              </Button>
            )}
            <div className="relative ml-10">
              <Icons.Activity className="absolute -left-9 size-6" />
              <h3 className="font-semibold tracking-tight">Activity</h3>
            </div>
            <div className="relative ml-10">
              <Avatar className="absolute -left-10 top-2 size-8">
                <AvatarImage
                  src={
                    `${session?.user.user_metadata.avatar_url}` ??
                    '/sign-in-background.jpg'
                  }
                  alt={'username' ?? ''}
                />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              {showCommentForm ? (
                <LexicalEditor
                  className="mb-4"
                  cardId={initialData.id}
                  onCancel={() => setShowCommentForm(false)}
                  mode="comment"
                />
              ) : (
                <Button
                  variant="ghost"
                  className="h-14 w-full justify-start bg-muted px-2"
                  onClick={() => setShowCommentForm(true)}
                >
                  Write a comment...
                </Button>
              )}
            </div>
          </DialogContent>
          {/* <DialogFooter className="sm:justify-start">
  <DialogClose asChild>
    <Button type="button" variant="secondary">
      Close
    </Button>
  </DialogClose>
</DialogFooter> */}
        </Dialog>
      )}
    </Draggable>
  );
}

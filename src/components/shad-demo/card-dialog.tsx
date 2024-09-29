'use client';

import { ComponentProps, useState } from 'react';
import Link from 'next/link';
import { Draggable } from '@hello-pangea/dnd';

import * as Icons from '@/components/icons/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  buttonVariants,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { cn } from '@/utils/cn';
import { LexicalEditor } from './lexical-editor';

interface MailListProps {
  title: string;
  id: string;
  index: number;
}

export function CardDialog({
  id,
  title,
  cardDescription,
  index,
}: MailListProps) {
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  return (
    <Draggable draggableId={id} index={index}>
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
              {title}
            </div>
          </DialogTrigger>
          <DialogContent className="flex max-w-[750px] flex-col">
            <DialogHeader>
              <DialogTitle className="relative ml-10 flex items-center justify-start gap-2">
                <Icons.Captions className="absolute -left-9 size-6" />
                {title}
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
              <LexicalEditor className="ml-10" />
            ) : cardDescription ? (
              cardDescription
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
                  src="/sign-in-background.jpg"
                  alt={'username' ?? ''}
                />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              {showCommentForm ? (
                <LexicalEditor />
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
            {/* <DialogFooter className="sm:justify-start">
  <DialogClose asChild>
    <Button type="button" variant="secondary">
      Close
    </Button>
  </DialogClose>
</DialogFooter> */}
          </DialogContent>
        </Dialog>
      )}
    </Draggable>
  );
}

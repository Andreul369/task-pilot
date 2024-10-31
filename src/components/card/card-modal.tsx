import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import parse from 'html-react-parser';

import * as Icons from '@/components/icons/icons';
import { LexicalEditor } from '@/components/lexical/lexical-editor';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from '@/components/ui';
import { getInitials } from '@/utils/helpers';
import useCardModalStore from '@/zustand/use-card-modal';

const CardModal = () => {
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { id, isOpen, onClose } = useCardModalStore();

  const { data: cardData, isLoading } = useQuery({
    queryKey: ['card', id],
    queryFn: () => fetch(`/api/cards/${id}`).then((res) => res.json()),
    // run the query only when id exists
    enabled: !!id,
  });

  const { data: auditLogsData, isLoading: auditLogsLoading } = useQuery({
    queryKey: ['card-logs', id],
    queryFn: () => fetch(`/api/cards/${id}/logs`).then((res) => res.json()),
    // run the query only when id exists
    enabled: !!id,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-w-[768px] flex-col space-y-4">
        {isLoading ? (
          <CardModalSkeleton />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="relative ml-10 flex items-center justify-start gap-2">
                <Icons.Captions className="absolute -left-9 size-6" />
                {cardData?.title}
              </DialogTitle>
              <DialogDescription className="ml-10">
                in list{' '}
                <Link href="#" className="underline">
                  {cardData?.list.title}
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
                  cardId={cardData?.id}
                  listId={cardData?.list_id}
                  initialContent={cardData?.description}
                  onCancel={() => setShowDescriptionForm(false)}
                  mode="description"
                />
              </div>
            ) : cardData?.description ? (
              <div
                className="ml-10 cursor-pointer"
                onClick={() => setShowDescriptionForm(true)}
              >
                {parse(cardData?.description)}
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
                    // `${session?.user.user_metadata.avatar_url}` ??
                    '/sign-in-background.jpg'
                  }
                  alt={'username' ?? ''}
                />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              {showCommentForm ? (
                <LexicalEditor
                  className="mb-4"
                  cardId={cardData?.id}
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
            {auditLogsData?.length > 0 &&
              auditLogsData?.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={`${log.user_image}`}
                      alt={log.user_name || 'User'}
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback>
                      {log && getInitials(log.user_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {log.user_name}
                      </span>{' '}
                      added this card
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(log.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                    {log.details && (
                      <p className="mt-1 text-sm">{log.details}</p>
                    )}
                  </div>
                </div>
              ))}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

function CardModalSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Title and List Link */}
      <div className="ml-10">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="mt-2 h-4 w-20" />
      </div>

      {/* Description Section */}
      <div className="ml-10">
        <Skeleton className="mb-2 h-6 w-24" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Activity Section */}
      <div className="ml-10">
        <Skeleton className="mb-2 h-6 w-20" />
        <div className="relative">
          <Skeleton className="absolute -left-10 top-2 h-8 w-8 rounded-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    </div>
  );
}

export default CardModal;

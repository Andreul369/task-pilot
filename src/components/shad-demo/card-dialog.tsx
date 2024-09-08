import { ComponentProps, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import * as Icons from '@/components/icons/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  ScrollArea,
  ScrollBar,
} from '@/components/ui';
import { cn } from '@/utils/cn';
import { Mail } from './data';
import { LexicalEditor } from './lexical-editor';
import { useMail } from './use-mail';

interface MailListProps {
  title: Mail | string;
}

export function CardDialog({ title }: MailListProps) {
  const [mail, setMail] = useMail();

  const [showDescriptionForm, setShowDescriptionForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {title}
        </Button>
      </DialogTrigger>

      <DialogContent>
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
            <AvatarImage src="/sign-in-background.jpg" alt={'username' ?? ''} />
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
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default';
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
}

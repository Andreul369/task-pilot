'use client';

import { ComponentProps, useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import * as Icons from '@/components/icons/icons';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
  ScrollBar,
  Textarea,
} from '@/components/ui';
import { cn } from '@/utils/cn';
import { Mail } from './data';
import { List } from './list';
import { useMail } from './use-mail';

interface MailListProps {
  items: Mail[];
}

export function Lists({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  const [showListForm, setShowListForm] = useState(false);

  const handleCardSubmit = async () => {
    console.log('something');
  };
  return (
    <ScrollArea className="h-[calc(100vh-104px)]">
      <div className="flex w-max gap-3 p-4">
        <>
          {items.map((item) => (
            <List key={item.id} list={item} />
          ))}
          {showListForm ? (
            <form
              onSubmit={handleCardSubmit}
              className="flex w-72 flex-col gap-2"
            >
              <Textarea name="cardTitle" className="w-full" />
              <div className="flex items-center justify-start gap-1">
                <Button type="submit" className="px-3 py-1.5">
                  Add card
                </Button>
                <Button variant="ghost" onClick={() => setShowListForm(false)}>
                  <Icons.Close className="size-5" />
                </Button>
              </div>
            </form>
          ) : (
            <Button
              variant="ghost"
              className="h-11 w-72 justify-start bg-white/25 backdrop-blur-sm"
              onClick={() => setShowListForm(true)}
            >
              <Icons.Plus className="mr-2 size-5" />
              Add another list
            </Button>
          )}
        </>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
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

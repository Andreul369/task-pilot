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
  Input,
  ScrollArea,
  ScrollBar,
  Textarea,
} from '@/components/ui';
import { cn } from '@/utils/cn';
import { CardDialog } from './card-dialog';
import { Mail } from './data';
import { useMail } from './use-mail';

interface MailListProps {
  list: Mail;
}

const data = [
  { id: 1, title: 'Title 1', order: 1 },
  { id: 2, title: 'Title 2', order: 2 },
  { id: 3, title: 'Title 3', order: 3 },
  { id: 4, title: 'Title 4', order: 4 },
  { id: 5, title: 'Title 5', order: 5 },
];

export function List({ list }: MailListProps) {
  //   const [mail, setMail] = useMail();
  const [showCardForm, setShowCardForm] = useState(false);
  const [listcards, setListcards] = useState(data);

  const handleCardSubmit = async () => {
    setListcards((prevState) => [
      ...prevState,
      {
        id: listcards.length + 1,
        title: 'title 6',
        order: listcards.length + 1,
      },
    ]);
  };

  return (
    // 👇 The name of the component used is card (shadcn)
    <Card
      className="w-72 self-start bg-card/90"
      //   onClick={() =>
      //     setMail({
      //       ...mail,
      //       selected: list.id,
      //     })
      //   }
    >
      <CardHeader className="p-2">
        <CardTitle className="text-lg">{list.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-2 p-2">
        {listcards.map((list) => (
          <CardDialog key={list.id} title={list.title} />
        ))}
      </CardContent>
      <CardFooter className="w-full p-2">
        {showCardForm ? (
          <form
            onSubmit={handleCardSubmit}
            className="flex w-full flex-col gap-2"
          >
            <Textarea
              name="cardTitle"
              placeholder="Enter a name for this card..."
              className="w-full"
            />
            <div className="flex items-center justify-start gap-1">
              <Button type="submit" className="px-3 py-1.5">
                Add card
              </Button>
              <Button variant="ghost" onClick={() => setShowCardForm(false)}>
                <Icons.Close className="size-5" />
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="ghost" onClick={() => setShowCardForm(true)}>
            <Icons.Plus className="mr-2 size-5" />
            Add a card
          </Button>
        )}
      </CardFooter>
    </Card>
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

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createCard } from '@/actions/cards';
import * as Icons from '@/components/icons/icons';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from '@/components/ui';

const formSchema = z.object({
  cardTitle: z.string(),
});

export function AddCardForm({ listId }: { listId: string }) {
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    setIsEditing(true);
  };

  const disableEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target.closest('.add-card-form-container')) {
        setIsEditing(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isEditing]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        disableEditing();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing, disableEditing]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { cardTitle } = data;
    console.log(cardTitle, 'submitted');
    await createCard(cardTitle, listId, pathName);
  }

  if (isEditing)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-72 space-y-6 bg-card/90"
        >
          <FormField
            control={form.control}
            name="cardTitle"
            render={({ field }) => (
              <FormItem>
                <FormControl ref={inputRef}>
                  <Textarea
                    placeholder="List title"
                    className="no-scrollbar resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="item-center flex gap-1">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting && (
                <Icons.Spinner className="mr-2 size-4 animate-spin" />
              )}
              Add card
            </Button>
            <Button variant="ghost" size="sm" onClick={() => disableEditing()}>
              <Icons.Close className="size-5" />
            </Button>
          </div>
        </form>
      </Form>
    );

  return (
    <Button variant="ghost" onClick={() => enableEditing()}>
      <Icons.Plus className="mr-2 size-5" />
      Add a card
    </Button>
  );
}

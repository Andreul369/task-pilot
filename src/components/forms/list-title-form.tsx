'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateListTitle } from '@/actions/lists';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@/components/ui';

const formSchema = z.object({
  listTitleToUpdate: z.string().max(30),
});

export function UpdateListTitleForm({
  listId,
  listTitle,
}: {
  listId: string;
  listTitle: string;
}) {
  const [title, setTitle] = useState(listTitle);
  // TODO: would it be better to use useOptimistic in this component and maybe revalidate path instead of redirect in the server function?
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathName = usePathname();

  const enableEditing = () => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listTitleToUpdate: listTitle,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    //TODO: if listTitleToUpdate empty? should just be back to listTitle
    const { listTitleToUpdate } = data;
    if (listTitleToUpdate === listTitle) return disableEditing();

    // TODO: what about error handling in the submit
    // TODO: what about use optimistic?
    // TODO: WHAT ABOUT REAL TIME??
    await updateListTitle(listId, listTitleToUpdate, pathName);
    setIsEditing(false);
    setTitle(listTitleToUpdate);
  }

  if (isEditing)
    return (
      <Form {...form}>
        <form onBlur={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="listTitleToUpdate"
            render={({ field }) => (
              <FormItem>
                <FormControl ref={inputRef}>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );

  return (
    <Button variant="ghost" onClick={() => enableEditing()}>
      {title}
    </Button>
  );
}

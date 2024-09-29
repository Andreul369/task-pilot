'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateBoardTitle } from '@/actions/boards';
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
  boardTitleToUpdate: z.string().max(30),
});

export function UpdateBoardTitleForm({
  boardId,
  boardTitle,
}: {
  boardId: string;
  boardTitle: string;
}) {
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
      boardTitleToUpdate: boardTitle,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    //TODO: if boardTitleToUpdate empty? should just be back to boardTitle
    const { boardTitleToUpdate } = data;
    if (boardTitleToUpdate === boardTitle) return disableEditing();

    // TODO: what about error handling in the submit
    await updateBoardTitle(boardId, boardTitleToUpdate, pathName);
    setIsEditing(false);
  }

  if (isEditing)
    return (
      <Form {...form}>
        <form onBlur={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="boardTitleToUpdate"
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
    <Button variant="transparent" onClick={() => enableEditing()}>
      {boardTitle}
    </Button>
  );
}

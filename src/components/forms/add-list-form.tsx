'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createList } from '@/actions/lists';
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
  listTitle: z.string(),
});

export function AddListForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathName = usePathname();
  const { boardId } = useParams<{ boardId: string }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

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

  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     if (!event.target.closest('.add-list-form-container')) {
  //       setIsEditing(false);
  //     }
  //   };

  //   document.addEventListener('click', handleOutsideClick);

  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, [isEditing]);

  // TODO: I am not sure this is the best way to do it.
  // Because add-card-form has the same useEffect on the document.
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       disableEditing();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [isEditing, disableEditing]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { listTitle } = data;
    await createList(listTitle, boardId, pathName);
  }

  if (isEditing)
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-72 space-y-6 self-start rounded-lg bg-card/90 p-2"
        >
          <FormField
            control={form.control}
            name="listTitle"
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
              Add list
            </Button>
            <Button variant="ghost" size="sm" onClick={() => disableEditing()}>
              <Icons.Close className="size-5" />
            </Button>
          </div>
        </form>
      </Form>
    );

  return (
    <Button
      variant="ghost"
      className="h-11 w-72 justify-start bg-white/25 shadow-sm backdrop-blur-sm hover:bg-white/35"
      onClick={() => enableEditing()}
    >
      <Icons.Plus className="mr-2 size-5" />
      Add a list
    </Button>
  );
}

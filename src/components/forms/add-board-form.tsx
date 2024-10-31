'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { createBoard } from '@/actions/boards';
import * as Icons from '@/components/icons/icons';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@/components/ui';
import { defaultImages } from '@/constants/images';
import { Tables } from '@/types/types_db';
import { cn } from '@/utils/cn';
import {
  hasAvailableBoardSlots,
  incrementWorkspaceBoardLimit,
} from '@/utils/org-limit';
import { unsplash } from '@/utils/unsplash/unsplash';

interface UnsplashImage {
  id: string;
  urls: {
    thumb: string;
    regular: string;
    full: string;
  };
  alt_description: string;
}

interface AddBoardFormProps {
  workspaces: Tables<'workspaces'>[];
  workspaceLimits: number;
}

const formSchema = z.object({
  boardTitle: z
    .string()
    .min(1, 'Title is required')
    .max(30, 'Title is too long'),
  workspaceId: z.string().min(1, 'Workspace is required'),
  boardBackground: z.string().min(1, 'Background is required'),
});

export function AddBoardForm({
  workspaces,
  workspaceLimits,
}: AddBoardFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const {
    data: images,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['boardBackgroundImages'],
    queryFn: async () => {
      const result = await unsplash.photos.getRandom({
        collectionIds: ['317099'],
        count: 8,
      });

      if (!result?.response) {
        throw new Error('Failed to fetch images');
      }

      return result.response as UnsplashImage[];
    },
    staleTime: 0, // Prevents automatic refetching by keeping data "fresh"
    refetchOnWindowFocus: false, // Disables refetching on window focus
    refetchOnMount: true, // Ensures refetch on remount only
  });

  if (isError) {
    console.error('Failed to fetch Unsplash images:', error);
  }

  const availableImages = images || defaultImages;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardTitle: '',
      workspaceId: workspaceId,
      boardBackground: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const { boardTitle, workspaceId, boardBackground } = data;

      const imageData = availableImages.find(
        (image) => image.id === boardBackground,
      );

      if (!imageData) {
        throw new Error('Selected image not found');
      }

      const boardId = await createBoard(
        boardTitle,
        workspaceId,
        imageData.id,
        imageData.urls.thumb,
        imageData.urls.full,
      );

      if (!boardId) throw new Error('Failed to create board');

      toast.success(`Board ${boardTitle} created successfully`);
      router.push(`/board/${boardId}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create board',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h4 className="text-center font-medium leading-none">Create board</h4>

        <FormField
          control={form.control}
          name="boardBackground"
          render={({ field }) => {
            // Set a default value to the first image if field.value is empty
            if (!field.value && availableImages.length > 0) {
              field.onChange(availableImages[0].id);
            }
            return (
              <FormItem>
                {isLoading ? (
                  <BoardFormSkeleton />
                ) : (
                  <>
                    <FormLabel className="flex flex-col gap-6">
                      <div className="relative h-32 w-56 self-center rounded-sm">
                        <Image
                          src={
                            availableImages.find(
                              (img) => img.id === field.value,
                            )?.urls.regular || availableImages[0]?.urls.regular
                          }
                          alt="board-cover"
                          fill
                          className="rounded-sm object-cover"
                        />
                        <Icons.BoardPlaceholder className="absolute left-[50%] top-0 -translate-x-1/2 transform" />
                      </div>
                      Background
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        className="flex w-full flex-wrap items-center justify-between"
                      >
                        {availableImages.map((image) => (
                          <FormItem key={image.id}>
                            <FormControl>
                              <RadioGroupItem
                                value={image.id}
                                id={image.id}
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={image.id}
                              className={cn(
                                'relative flex h-10 w-16 flex-col items-center justify-between rounded-md border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground ',
                                image.id === field.value && 'border-primary',
                              )}
                            >
                              <Image
                                src={image.urls.thumb}
                                fill
                                alt={image.alt_description}
                                className="rounded-sm object-cover"
                              />
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="boardTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Title</FormLabel>
              <FormControl>
                <Input placeholder="Board Title" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workspaceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={workspaceId}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workspaces?.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                This Workspace has {workspaceLimits} boards remaining. Free
                Workspaces can only have 10 open boards. For unlimited boards,
                upgrade your Workspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Board'
          )}
        </Button>
      </form>
    </Form>
  );
}

function BoardFormSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="relative h-32 w-56 self-center" />
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-16" />
        ))}
      </div>
    </div>
  );
}

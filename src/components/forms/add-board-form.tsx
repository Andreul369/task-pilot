'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
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
} from '@/components/ui';
import { defaultImages } from '@/constants/images';
import { cn } from '@/utils/cn';
import { unsplash } from '@/utils/unsplash/unsplash';

const formSchema = z.object({
  boardTitle: z.string().min(1).max(30),
  workspaceId: z.string(),
  boardBackground: z.string(),
});

export function AddBoardForm({
  workspaces,
  userId,
}: {
  activeWorkspaceId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const pathName = usePathname();
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 8,
        });
        if (result && result.response) {
          const responseImages = result.response as Array<Record<string, any>>;
          setImages(responseImages);
        } else {
          setImages(defaultImages);
          console.error('Failed to get images from Unsplash.');
        }
      } catch (error) {
        console.error(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardTitle: '',
      workspaceId: workspaceId,
      boardBackground: images[0]?.id,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { boardTitle, workspaceId, boardBackground } = data;
    const imageData = images.find((image) => image.id === boardBackground);
    const { id: imageId, urls } = imageData;
    const imageThumb = urls.thumb;
    const imageFull = urls.full;

    const boardId = await createBoard(
      boardTitle,
      workspaceId,
      imageId,
      imageThumb,
      imageFull,
      pathName,
    );

    if (boardId) {
      router.push(`/board/${boardId}`);
    } else toast(`Error creating ${boardTitle}.`);
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
            if (!field.value && images.length > 0) {
              field.onChange(images[0].id);
            }
            return (
              <FormItem>
                <FormLabel className="flex flex-col gap-6">
                  <div className="relative h-32 w-56 self-center rounded-sm">
                    <Image
                      src={
                        images.find((img) => img.id === field.value)?.urls
                          .full || images[0]?.urls.full
                      }
                      alt="board-cover"
                      fill
                      className="rounded-sm	object-cover"
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
                    {images.map((image) => (
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
                            src={image.urls.full}
                            fill
                            alt={image.alt_description}
                            className="rounded-sm	object-cover"
                          />
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>

                <FormMessage />
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
                This Workspace has 6 boards remaining. Free Workspaces can only
                have 10 open boards. For unlimited boards, upgrade your
                Workspace.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && (
            <Icons.Spinner className="mr-2 size-4 animate-spin" />
          )}
          Create
        </Button>
      </form>
    </Form>
  );
}

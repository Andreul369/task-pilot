'use client';

import { ComponentProps, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { insertWorkspace } from '@/actions/workspaces';
import * as Icons from '@/components/icons/icons';
import {
  Badge,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';

const formSchema = z.object({
  workspaceName: z.string(),
});

export function CreateWorkspaceDialog({ userId }: { userId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathName = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workspaceName: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const { workspaceName } = data;

    await insertWorkspace(userId, workspaceName, pathName);
    toast(`Workspace ${workspaceName} has been created.`);
  }

  return (
    <div className="flex w-1/2 flex-col gap-6 bg-background p-6 py-16">
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Let&apos;s build a Workspace
        </h2>
        <p className="text-muted-foreground">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Workspace name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of your company, team or organization.
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
    </div>
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

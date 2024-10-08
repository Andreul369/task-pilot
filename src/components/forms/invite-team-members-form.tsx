'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { inviteWorkspacegMembersAction } from '@/actions/invitations';
import * as Icons from '@/components/icons/icons';
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

const formSchema = z.object({
  invites: z.array(
    z.object({
      email: z.string().email().optional(),
      role: z.enum(['owner', 'member']),
    }),
  ),
  redirectTo: z.string().optional(),
  revalidatePath: z.string().optional(),
});

export function InviteTeamMembersForm({
  userId,
  workspaceId,
}: {
  userId: string;
  workspaceId: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invites: [
        {
          email: '',
          role: 'member',
        },
      ],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Remove invites without email (last appended invite validation)
    const filteredInvites = data.invites.filter(
      (invite) => invite.email !== undefined,
    );
    const pathName = '/settings';
    await inviteWorkspacegMembersAction(
      userId,
      workspaceId,
      filteredInvites,
      pathName,
    );
  }

  const { fields, append } = useFieldArray({
    name: 'invites',
    control: form.control,
  });

  return (
    <DialogContent className="max-w-[455px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-4">
            <DialogHeader>
              <DialogTitle>Invite Members</DialogTitle>
              <DialogDescription>
                Invite new members by email address.
              </DialogDescription>
            </DialogHeader>

            {fields.map((field, index) => (
              <div
                className="mt-3 flex items-center justify-between space-x-4"
                key={index.toString()}
              >
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`invites.${index}.email`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="jane@example.com"
                          type="email"
                          autoComplete="off"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck="false"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`invites.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            ))}

            <Button
              variant="outline"
              type="button"
              className="mt-4 space-x-1"
              onClick={() => append({ email: undefined, role: 'member' })}
            >
              <Icons.Add />
              <span>Add more</span>
            </Button>
            <DialogFooter className="mt-8 items-center !justify-between border-t-[1px] pt-4">
              <div>
                {Object.values(form.formState.errors).length > 0 && (
                  <span className="text-sm text-destructive">
                    Please complete the fields above.
                  </span>
                )}
              </div>
              <Button
                type="submit"
                // disabled={inviteMembers.status === 'executing'}
                className="w-full md:w-auto"
              >
                {/* {inviteMembers.status === 'executing' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Invite'
                )} */}
                Invite
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

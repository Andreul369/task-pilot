'use client';

import { useFormState } from 'react-dom';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createInvitation } from '@/lib/actions/invitations';
import fullInvitationUrl from '@/lib/full-invitation-url';
import { Button } from '../ui';
import { Label } from '../ui/label';

type Props = {
  accountId: string;
};

const invitationOptions = [
  { label: '24 Hour', value: '24_hour' },
  { label: 'One time use', value: 'one_time' },
];

const memberOptions = [
  { label: 'Owner', value: 'owner' },
  { label: 'Member', value: 'member' },
];

const initialState = {
  message: '',
  token: '',
};

export default function NewInvitationForm({ accountId }: Props) {
  const [state, formAction] = useFormState(createInvitation, initialState);
  const isSubmitting = false;
  return (
    <form className="flex w-full flex-1 flex-col justify-center gap-y-6 text-foreground animate-in">
      {Boolean(state?.token) ? (
        <div className="text-sm">{fullInvitationUrl(state.token!)}</div>
      ) : (
        <>
          <input type="hidden" name="accountId" value={accountId} />
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="invitationType">Invitation Type</Label>
            <Select defaultValue="one_time" name="invitationType">
              <SelectTrigger>
                <SelectValue placeholder="Invitation type" />
              </SelectTrigger>
              <SelectContent>
                {invitationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="accountRole">Team Role</Label>
            <Select defaultValue="member" name="accountRole">
              <SelectTrigger>
                <SelectValue placeholder="Member type" />
              </SelectTrigger>
              <SelectContent>
                {memberOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <SubmitButton
                        formAction={async (prevState: any, formData: FormData) => formAction(formData)}
                        errorMessage={state?.message}
                        pendingText="Creating..."
                    >
                        Create invitation
                    </SubmitButton> */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            )}
            Create
          </Button>
        </>
      )}
    </form>
  );
}

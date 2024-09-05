// @ts-nocheck

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as Icons from '@/components/icons/icons';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';
import { handleRequest } from '@/utils/auth-helpers/client';
import { updateEmail } from '@/utils/auth-helpers/server';

export default function EmailForm({
  userEmail,
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new email is the same as the old email
    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <Card
      description="Please enter the email address you want to use to login."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            We will email you to verify the change.
          </p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            )}
            Update Email
          </Button>
        </div>
      }
    >
      <CardHeader>
        <CardTitle>Your Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
          <Input
            placeholder="Your email"
            type="text"
            name="newEmail"
            autoCapitalize="none"
            className="w-full rounded-md"
            autoCorrect="off"
            defaultValue={userEmail ?? ''}
          />
        </form>
      </CardContent>
    </Card>
  );
}

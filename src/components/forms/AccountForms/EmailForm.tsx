'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import * as Icons from '@/components/icons/icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <Card>
      <CardHeader>
        <CardTitle>Your Email</CardTitle>
        <CardDescription>
          Please enter the email address you want to use to login.
        </CardDescription>
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
      <CardFooter>
        <p className="pb-4 sm:pb-0">We will email you to verify the change.</p>
        <Button type="submit" form="emailForm" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.Spinner className="mr-2 size-4 animate-spin" />
          )}
          Update Email
        </Button>
      </CardFooter>
    </Card>
  );
}

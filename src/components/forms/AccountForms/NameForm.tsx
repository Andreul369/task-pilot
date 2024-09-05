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
import { updateName } from '@/utils/auth-helpers/server';

export default function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (e.currentTarget.fullName.value === userName) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Name</CardTitle>
        <CardDescription>
          Please enter your full name, or a display name you are comfortable
          with.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="nameForm" onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="fullName"
            className="w-full rounded-md"
            defaultValue={userName}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
      </CardContent>

      <CardFooter>
        <p className="pb-4 sm:pb-0">64 characters maximum</p>
        <Button type="submit" form="nameForm" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.Spinner className="mr-2 size-4 animate-spin" />
          )}
          Update Name
        </Button>
      </CardFooter>
    </Card>
  );
}

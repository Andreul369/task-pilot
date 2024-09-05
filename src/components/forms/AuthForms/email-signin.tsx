'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import * as Icons from '@/components/icons/icons';
import { Button, Input } from '@/components/ui';
import { handleRequest } from '@/utils/auth-helpers/client';
import { signInWithEmail } from '@/utils/auth-helpers/server';

// Define prop type with allowPassword boolean
interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton,
}: EmailSignInProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithEmail, router);
    setIsSubmitting(false);
  };

  return (
    <>
      <form noValidate={true} onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className="w-full rounded-md"
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.Spinner className="mr-2 size-4 animate-spin" />
            )}
            Sign in
          </Button>
        </div>
      </form>
      {allowPassword && (
        <>
          <p>
            <Link href="/signin/password_signin" className="text-sm font-light">
              Sign in with email and password
            </Link>
          </p>
          <p>
            <Link href="/signin/signup" className="text-sm font-light">
              Don&apos;t have an account? Sign up
            </Link>
          </p>
        </>
      )}
    </>
  );
}

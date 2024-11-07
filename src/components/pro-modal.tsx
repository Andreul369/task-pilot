'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import * as Icons from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { createStripePortal } from '@/utils/stripe/server';
import useProModal from '@/zustand/pro-modal';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui';

const ProModal = () => {
  const { onClose, isOpen } = useProModal();
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image
            src={'/sign-in-background.jpg'}
            alt="Hero"
            className="object-cover"
            fill
          />
        </div>
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Upgrade to TaskPilot Pro Today!</CardTitle>
            <CardDescription>Explore the best of TaskPilot</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <Icons.Check className="size-5" /> Unlimited Boards
            </p>
            <p className="flex items-center gap-2">
              <Icons.Check className="size-5" /> Advanced Checklists
            </p>
            <p className="flex items-center gap-2">
              <Icons.Check className="size-5" /> Admin and security features
            </p>
            <p className="flex items-center gap-2">
              <Icons.Check className="size-5" /> And more!
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleStripePortalRequest}
              disabled={isSubmitting}
              className="w-full"
            >
              Upgrade
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

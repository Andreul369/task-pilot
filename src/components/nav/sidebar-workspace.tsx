'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as Icons from '@/components/icons/icons';
import { cn } from '@/utils/cn';
import useProModal from '@/zustand/pro-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui';

const SidebarWorkspace = ({ workspaces }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const currentPage = pathSegments.pop(); // gets 'settings', 'activity', etc.
  const currentWorkspaceId = pathSegments[pathSegments.length - 1];
  const proModalStore = useProModal();

  return (
    <div className="sticky top-14 hidden h-[calc(100vh-56px)] border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen w-56 flex-col gap-2 lg:w-72">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Accordion
              type="multiple"
              className="w-full"
              defaultValue={[currentWorkspaceId]}
            >
              {workspaces?.map((workspace) => (
                <AccordionItem key={workspace.id} value={`${workspace.id}`}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-start gap-3 text-base font-semibold">
                      <Icons.Castle className="size-5" />
                      {workspace.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href={`/workspace/${workspace.id}`}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        currentPage === workspace.id && 'bg-muted text-primary',
                      )}
                    >
                      <Icons.ClipboardList className="size-4" />
                      Boards
                    </Link>
                    <Link
                      href={`/workspace/${workspace.id}/activity`}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        currentWorkspaceId === workspace.id &&
                          currentPage === 'activity' &&
                          'bg-muted text-primary',
                      )}
                    >
                      <Icons.Activity className="size-4" />
                      Activity
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                      </Badge>
                    </Link>
                    <Link
                      href={`/workspace/${workspace.id}/settings`}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        currentWorkspaceId === workspace.id &&
                          currentPage === 'settings' &&
                          'bg-muted text-primary',
                      )}
                    >
                      <Icons.Settings className="size-4" />
                      Settings
                    </Link>
                    <Link
                      href={`/workspace/${workspace.id}/billing`}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        currentWorkspaceId === workspace.id &&
                          currentPage === 'billing' &&
                          'bg-muted text-primary',
                      )}
                    >
                      <Icons.CreditCard className="size-4" />
                      Billing
                    </Link>

                    <Card>
                      <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>
                          Unlock all features and get unlimited access to our
                          support team.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => proModalStore.onOpen()}
                        >
                          Upgrade
                        </Button>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarWorkspace;

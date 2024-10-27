import React from 'react';
import Link from 'next/link';

import * as Icons from '@/components/icons/icons';
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
  return (
    <div className="sticky top-14 hidden h-[calc(100vh-56px)] border-r  bg-muted/40 md:block">
      <div className="flex h-full max-h-screen w-56 flex-col gap-2 lg:w-72">
        <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px]">
          <h3 className="text-lg font-semibold">Workspaces</h3>
          {/* <Icons.Plus className="size-6" /> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Accordion type="multiple" className="w-full">
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
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Icons.ClipboardList className="size-4" />
                      Boards
                    </Link>
                    <Link
                      href={`/workspace/${workspace.id}/activity`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Icons.Activity className="size-4" />
                      Activity
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                      </Badge>
                    </Link>
                    <Link
                      href={`/workspace/${workspace.id}/settings`}
                      className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                    >
                      <Icons.Settings className="size-4" />
                      Settings
                    </Link>
                    <Link
                      href={`/workspace/${workspace.id}/billing`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                        <Button size="sm" className="w-full">
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

'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

import * as Icons from '@/components/icons/icons';
import { Tables } from '@/types/types_db';
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
  ScrollArea,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../ui';

interface SidebarWorkspaceMobileProps {
  workspaces: Tables<'workspaces'>[];
}

const SidebarWorkspaceMobile = ({
  workspaces,
}: SidebarWorkspaceMobileProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          href="#"
          className="flex items-center gap-1 text-lg font-semibold"
        >
          <Icons.Logo className="size-6" />
          {/* {siteConfig.name} */}
          Task Pilot
        </Link>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="pr-5">
            <Accordion type="multiple" className="w-full">
              {workspaces.length > 0
                ? workspaces?.map((workspace) => (
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
                          <CardHeader className="p-4">
                            <CardTitle className="text-xl ">
                              Upgrade to Pro
                            </CardTitle>
                            <CardDescription>
                              {`Unlock all features and create unlimited boards in ${workspace.name}.`}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <Button size="sm" className="w-full">
                              Upgrade
                            </Button>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                : null}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarWorkspaceMobile;

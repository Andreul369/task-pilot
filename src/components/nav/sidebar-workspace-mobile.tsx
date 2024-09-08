import React from 'react';
import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';

import * as Icons from '@/components/icons/icons';
import { workspaces } from '../shad-demo/data';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '../ui';

const SidebarWorkspaceMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-1 text-lg font-semibold"
          >
            <Icons.Logo className="size-6" />
            {/* {siteConfig.name} */}
            Task Pilot
          </Link>

          <Accordion type="multiple" className="w-full">
            <Accordion type="multiple" className="w-full">
              {workspaces.map((workspace) => (
                <AccordionItem key={workspace.id} value={`${workspace.id}`}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-start gap-3 text-base font-semibold">
                      <Icons.Castle className="size-5" />
                      Workspace #1
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Icons.ClipboardList className="size-4" />
                      Boards
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Icons.Activity className="size-4" />
                      Activity
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                      </Badge>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                    >
                      <Icons.Settings className="size-4" />
                      Settings
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Icons.CreditCard className="size-4" />
                      Billing
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Accordion>
        </nav>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarWorkspaceMobile;

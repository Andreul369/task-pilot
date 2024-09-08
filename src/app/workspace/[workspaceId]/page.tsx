import Link from 'next/link';
import { Bell, Menu, Package2, Search } from 'lucide-react';

import * as Icons from '@/components/icons/icons';
import Pricing from '@/components/pricing';
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
  Input,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function WorkspaceIdPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Workspaces</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="size-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
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
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-center justify-start gap-3 text-base font-semibold">
                        <Icons.Castle className="size-5" />
                        Workspace #2
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
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <div className="flex items-center justify-start gap-3 text-base font-semibold">
                        <Icons.Castle className="size-5" />
                        Workspace #3
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
                </Accordion>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="item-1">
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
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        <div className="flex items-center justify-start gap-3 text-base font-semibold">
                          <Icons.Castle className="size-5" />
                          Workspace #2
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
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        <div className="flex items-center justify-start gap-3 text-base font-semibold">
                          <Icons.Castle className="size-5" />
                          Workspace #3
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
                  </Accordion>
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search workspaces..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Workspace #1
              </h1>
            </div>
            <div className="flex flex-1 flex-col gap-12">
              <div className="flex flex-col gap-1">
                <h3 className="flex items-center gap-4 text-2xl font-bold tracking-tight">
                  <span>Starred boards</span>
                  <Icons.Star className="size-5" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <div className="row-wrap flex gap-4">
                  <Card className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">Board #1</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">Board #2</CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold tracking-tight">
                  Your boards
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <div className="row-wrap flex gap-4">
                  <Card className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">Board #1</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">
                        Create new board
                      </CardTitle>
                      <CardDescription>7 remaining</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold tracking-tight">
                  Guest workspaces
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <div className="row-wrap flex gap-4">
                  <Card className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">
                        Dev Department #3
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="h-24 w-52 bg-muted/40">
                    <CardHeader className="p-3">
                      <CardTitle className="text-lg">
                        Sales Department #4
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>

            <Pricing
              user={user}
              products={products ?? []}
              subscription={subscription}
            />
          </main>
        </div>
      </div>
    </>
  );
}

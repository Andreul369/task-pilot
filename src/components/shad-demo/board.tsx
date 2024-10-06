'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from 'lucide-react';

import * as Icons from '@/components/icons/icons';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Separator,
  TooltipProvider,
} from '@/components/ui';
import { Tables } from '@/types/types_db';
import { cn } from '@/utils/cn';
import { ListsServer } from '../experiment/server/board.server';
import { UpdateBoardTitleForm } from '../forms/board-title-form';
import { AccountSwitcher } from './account-switcher';
import { ListsContainer } from './lists-container';
import { Nav } from './nav';

interface BoardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  lists: Tables<'lists'>[];
  boardData: Tables<'boards'>;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Board({
  accounts,
  lists,
  boardData,
  defaultLayout = [16, 84],
  defaultCollapsed = false,
  navCollapsedSize,
}: BoardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:board=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${boardData.image_full_url})` }}
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={9}
          maxSize={16}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`;
          }}
          className={cn(
            'bg-background bg-opacity-95',
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out',
          )}
        >
          <div
            className={cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2',
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />

          <Link
            href={`/workspace/${boardData.workspace_id}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Icons.ClipboardList className="size-4" />
            Boards
          </Link>
          <Link
            href={`/workspace/${boardData.workspace_id}/activity`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Icons.Activity className="size-4" />
            Activity
            <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href={`/workspace/${boardData.workspace_id}/settings`}
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          >
            <Icons.Settings className="size-4" />
            Settings
          </Link>
          <Link
            href={`/workspace/${boardData.workspace_id}/billing`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Icons.CreditCard className="size-4" />
            Billing
          </Link>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Social',
                label: '972',
                icon: Users2,
                variant: 'ghost',
              },
              {
                title: 'Updates',
                label: '342',
                icon: AlertCircle,
                variant: 'ghost',
              },
              {
                title: 'Forums',
                label: '128',
                icon: MessagesSquare,
                variant: 'ghost',
              },
              {
                title: 'Shopping',
                label: '8',
                icon: ShoppingCart,
                variant: 'ghost',
              },
              {
                title: 'Promotions',
                label: '21',
                icon: Archive,
                variant: 'ghost',
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={84}>
          <div className="flex w-full items-center justify-between bg-black/25 backdrop-blur-sm">
            <div className="flex w-full items-center justify-start gap-4 px-4 py-2">
              <UpdateBoardTitleForm
                boardId={boardData.id}
                boardTitle={boardData.title}
              />

              <Button variant="ghost" className="text-white">
                <Icons.Star className="size-4" />
              </Button>
              <Button variant="ghost" className="text-white">
                <Icons.Users className="size-4" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="transparent"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Icons.DotsHorizontal className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

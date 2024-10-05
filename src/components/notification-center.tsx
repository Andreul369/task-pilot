'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import * as Icons from '@/components/icons/icons';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useNotifications } from '@/hooks/use-notifications';

function EmptyState({ description }) {
  return (
    <div className="flex h-[460px] flex-col items-center justify-center space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
        <Icons.Bell size={18} />
      </div>
      <p className="text-sm text-[#606060]">{description}</p>
    </div>
  );
}

function NotificationItem({
  id,
  setOpen,
  description,
  createdAt,
  recordId,
  from,
  to,
  markMessageAsRead,
  type,
}) {
  switch (type) {
    case 'transactions':
      return (
        <div className="items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary">
          <Link
            className="items-between flex justify-between space-x-4 "
            onClick={() => setOpen(false)}
            href={`/transactions?filter=${JSON.stringify({
              date: {
                from,
                to,
              },
            })}`}
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center space-y-0 rounded-full border">
                Icons.Transactions
              </div>
            </div>
            <div>
              <p className="text-sm">{description}</p>
              <span className="text-xs text-[#606060]">
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>
          {markMessageAsRead && (
            <div>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-transparent hover:bg-[#1A1A1A]"
                onClick={() => markMessageAsRead(id)}
              >
                Icons.Inventory2
              </Button>
            </div>
          )}
        </div>
      );

    case 'transaction':
      return (
        <div className="items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary">
          <Link
            className="items-between flex justify-between space-x-4 "
            onClick={() => setOpen(false)}
            href={`/transactions?id=${recordId}`}
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center space-y-0 rounded-full border">
                Icons.Transactions
              </div>
            </div>
            <div>
              <p className="text-sm">{description}</p>
              <span className="text-xs text-[#606060]">
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>
          {markMessageAsRead && (
            <div>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-transparent hover:bg-[#1A1A1A]"
                onClick={() => markMessageAsRead(id)}
              >
                Icons.Inventory2
              </Button>
            </div>
          )}
        </div>
      );

    case 'inbox':
      return (
        <div className="items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary">
          <Link
            className="items-between flex justify-between space-x-4 "
            onClick={() => setOpen(false)}
            href={`/inbox?id=${recordId}`}
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center space-y-0 rounded-full border">
                Icons.Email
              </div>
            </div>
            <div>
              <p className="text-sm">{description}</p>
              <span className="text-xs text-[#606060]">
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>
          {markMessageAsRead && (
            <div>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-transparent hover:bg-[#1A1A1A]"
                onClick={() => markMessageAsRead(id)}
              >
                <Icons.Package2 />
              </Button>
            </div>
          )}
        </div>
      );

    case 'match':
      return (
        <div className="items-between flex justify-between space-x-4 px-3 py-3 hover:bg-secondary">
          <Link
            className="items-between flex justify-between space-x-4 "
            onClick={() => setOpen(false)}
            href={`/transactions?id=${recordId}`}
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center space-y-0 rounded-full border">
                Icons.Match
              </div>
            </div>
            <div>
              <p className="text-sm">{description}</p>
              <span className="text-xs text-[#606060]">
                {formatDistanceToNow(new Date(createdAt))} ago
              </span>
            </div>
          </Link>
          {markMessageAsRead && (
            <div>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-transparent hover:bg-[#1A1A1A]"
                onClick={() => markMessageAsRead(id)}
              >
                <Icons.Package2 />
              </Button>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

export function NotificationCenter() {
  const [isOpen, setOpen] = useState(false);
  const {
    hasUnseenNotifications,
    notifications,
    markMessageAsRead,
    markAllMessagesAsSeen,
    markAllMessagesAsRead,
  } = useNotifications();

  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  );

  const archivedNotifications = notifications.filter(
    (notification) => notification.read,
  );

  useEffect(() => {
    if (isOpen && hasUnseenNotifications) {
      markAllMessagesAsSeen();
    }
  }, [hasUnseenNotifications, isOpen]);

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative flex h-8 w-8 items-center rounded-full"
        >
          {hasUnseenNotifications && (
            <div className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-[#FFD02B]" />
          )}
          <Icons.Bell className="size-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="relative h-[535px] w-screen overflow-hidden p-0 md:w-[400px]"
        align="end"
        sideOffset={10}
      >
        <Tabs defaultValue="inbox">
          <TabsList className="w-full justify-start rounded-none border-b-[1px] bg-transparent py-6">
            <TabsTrigger value="inbox" className="font-normal">
              Inbox
            </TabsTrigger>
            <TabsTrigger value="archive" className="font-normal">
              Archive
            </TabsTrigger>
          </TabsList>

          <Link
            href="/settings/notifications"
            className="absolute right-[11px] top-1.5"
          >
            <Button
              variant="secondary"
              size="icon"
              className="bg-ransparent rounded-full hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <Icons.Settings className="text-[#606060]" size={16} />
            </Button>
          </Link>

          <TabsContent value="inbox" className="relative mt-0">
            {!unreadNotifications.length && (
              <EmptyState description="No new notifications" />
            )}

            {unreadNotifications.length > 0 && (
              <ScrollArea className="h-[485px] pb-12">
                <div className="divide-y">
                  {unreadNotifications.map((notification) => {
                    return (
                      <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        markMessageAsRead={markMessageAsRead}
                        setOpen={setOpen}
                        description={notification.payload.description}
                        createdAt={notification.createdAt}
                        recordId={notification.payload.recordId}
                        type={notification.payload.type}
                        from={notification.payload?.from}
                        to={notification.payload?.to}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            )}

            {unreadNotifications.length > 0 && (
              <div className="absolute bottom-0 flex h-12 w-full items-center justify-center border-t-[1px]">
                <Button
                  variant="secondary"
                  className="bg-transparent"
                  onClick={markAllMessagesAsRead}
                >
                  Archive all
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="archive" className="mt-0">
            {!archivedNotifications.length && (
              <EmptyState description="Nothing in the archive" />
            )}

            {archivedNotifications.length > 0 && (
              <ScrollArea className="h-[490px]">
                <div className="divide-y">
                  {archivedNotifications.map((notification) => {
                    return (
                      <NotificationItem
                        key={notification.id}
                        setOpen={setOpen}
                        description={notification.payload.description}
                        createdAt={notification.createdAt}
                        recordId={notification.payload.recordId}
                        type={notification.payload.type}
                      />
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}

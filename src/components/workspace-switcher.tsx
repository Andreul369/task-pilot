'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Castle, Check, ChevronsUpDown } from 'lucide-react';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';
import { Tables } from '@/types/types_db';

interface WorkspaceSwitcherProps {
  workspaces: Tables<'workspaces'>[];
}

export function WorkspaceSwitcher({ workspaces }: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const activeWorkspace = workspaces.find((w) => w.id === workspaceId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[210px] justify-between"
        >
          {activeWorkspace ? (
            <div className="flex items-center">
              <Castle className="mr-2 size-4" />
              {activeWorkspace.name}
            </div>
          ) : (
            'Select workspace...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[210px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup>
              {workspaces?.map((workspace) => (
                <Link key={workspace.id} href={`/workspace/${workspace.id}`}>
                  <CommandItem
                    key={workspace.id}
                    value={workspace.id}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      router.push(`/workspace/${workspace.id}`);
                    }}
                  >
                    {activeWorkspace?.id === workspace.id ? (
                      <Check className="mr-2 size-4" />
                    ) : (
                      <Castle className="mr-2 size-4" />
                    )}

                    {workspace.name}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

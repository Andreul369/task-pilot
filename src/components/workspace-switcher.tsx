'use client';

import * as React from 'react';
import Link from 'next/link';
import { Castle, Check, ChevronsUpDown } from 'lucide-react';

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

export function WorkspaceSwitcher({ workspaces }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[210px] justify-between"
        >
          {value ? (
            <div className="flex items-center">
              <Castle className="mr-2 size-4" />
              {workspaces.find((workspace) => workspace.id === value)?.name}
            </div>
          ) : (
            'Select workspace...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[210px] p-0">
        <Command>
          <CommandInput placeholder="Search workspace..." />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup>
              {workspaces?.map((workspace) => (
                <Link key={workspace.id} href={`/workspace/${workspace.id}`}>
                  <CommandItem
                    value={workspace.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    {value === workspace.id ? (
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

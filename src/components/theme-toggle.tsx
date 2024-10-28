'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';

import * as Icons from '@/components/icons/icons';
import { Switch } from '@/components/ui';

const ThemeToggle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { setTheme, theme } = useTheme();

  const themeContent = {
    light: {
      icon: <Icons.Sun className="size-4" />,
      text: 'Light Mode',
    },
    dark: {
      icon: <Icons.MoonShad className="size-4" />,
      text: 'Dark Mode',
    },
  }[theme as 'light' | 'dark'];

  return (
    <div
      ref={ref}
      {...props}
      className="flex w-full items-center justify-between px-2"
      onClick={(e) => e.preventDefault()}
    >
      <p className="flex items-center gap-2">
        {themeContent.icon}
        <span>{themeContent.text}</span>
      </p>
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </div>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;

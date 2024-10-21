// import ThemeSwitcher from './ThemeSwitcher';

import { cn } from '@/lib/utils';
import { NavUser } from './nav-user';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { ModeToggle } from './mode-toggle';
// import ThemeSwitcher from './ThemeSwitcher';

export default function Appbar() {
  const { open } = useSidebar();

  return (
    <header className="flex items-center justify-between border-b bg-background h-[75px] sticky top-0 z-40 px-4">
      <SidebarTrigger
        className={cn(
          '-ml-8 rounded-full dark:bg-zinc-800 hover:opacity-90 transition-all duration-300 bg-white shadow-md',
          !open && 'ml-0',
        )}
      />
      <div className="flex items-center justify-center">
        <ModeToggle />
        {/* <ThemeSwitcher /> */}
        <NavUser />
      </div>
      {/* <ThemeSwitcher /> */}
    </header>
  );
}

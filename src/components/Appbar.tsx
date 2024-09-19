// import ThemeSwitcher from './ThemeSwitcher';

import { cn } from '@/lib/utils';
import { NavUser } from './nav-user';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
// import ThemeSwitcher from './ThemeSwitcher';

export default function Appbar() {
  const { open } = useSidebar();

  return (
    <header className="flex items-center justify-between border-b bg-background h-[75px] sticky top-0 z-40 px-4">
      <SidebarTrigger
        className={cn('-ml-8 rounded-full bg-white shadow-md', !open && 'ml-0')}
      />

      <div className="flex items-center justify-center">
        {/* <ThemeSwitcher /> */}
        <NavUser />
      </div>

      {/* <ThemeSwitcher /> */}
    </header>
  );
}

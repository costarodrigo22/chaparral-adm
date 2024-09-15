// import ThemeSwitcher from './ThemeSwitcher';

import { cn } from '@/lib/utils';
import { NavUser } from './nav-user';
import { SidebarTrigger, useSidebar } from './ui/sidebar';

export default function Appbar() {
  const { open } = useSidebar();

  console.log(open);

  return (
    <header className="flex items-center justify-between border-b bg-background h-[52px] sticky top-0 z-40 px-4">
      <SidebarTrigger
        className={cn('-ml-8 rounded-full bg-white shadow-md', !open && 'ml-0')}
      />

      <div>
        <NavUser
          user={{
            name: 'Rodrigo',
            email: 'rodrigo@example.com',
            avatar: '/avatars/shadcn.jpg',
          }}
        />
      </div>

      {/* <ThemeSwitcher /> */}
    </header>
  );
}

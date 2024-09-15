import { AppSidebar } from '@/components/app-sidebar';
import Appbar from '@/components/Appbar';
import { SidebarLayout } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="">
      <SidebarLayout>
        <AppSidebar />

        <div className="w-full">
          <Appbar />
          <Outlet />
        </div>
      </SidebarLayout>
    </div>
  );
}

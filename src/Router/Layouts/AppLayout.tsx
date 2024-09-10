import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="bg-red-300">
      <span>Meu Layout</span>

      <Outlet />
    </div>
  );
}

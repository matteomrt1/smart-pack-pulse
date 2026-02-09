import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { UserRole } from '@/types';

interface AppLayoutProps {
  role: UserRole;
  onRoleToggle: () => void;
}

export function AppLayout({ role, onRoleToggle }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role={role} onRoleToggle={onRoleToggle} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

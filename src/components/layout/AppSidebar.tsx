import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Box, Settings, Users, Package, ShoppingCart,
  Leaf, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UserRole } from '@/types';

interface AppSidebarProps {
  role: UserRole;
  onRoleToggle: () => void;
}

const clientLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/configurator', label: 'Configuratore', icon: Package },
  { to: '/catalog', label: 'Catalogo', icon: ShoppingCart },
];

const internalLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/catalog', label: 'Gestione Catalogo', icon: Box },
  { to: '/admin/clients', label: 'Gestione Clienti', icon: Users },
];

export function AppSidebar({ role, onRoleToggle }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const links = role === 'client' ? clientLinks : internalLinks;

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm tracking-tight text-sidebar-foreground">
            PackConfig
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {links.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <link.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 space-y-1">
        <button
          onClick={onRoleToggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span>{role === 'client' ? 'Pannello Interno' : 'Portale Cliente'}</span>
          )}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Comprimi</span>}
        </button>
      </div>
    </aside>
  );
}

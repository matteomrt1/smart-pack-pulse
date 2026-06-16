import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Box, Users, Package, ShoppingCart,
  ChevronLeft, ChevronRight, ArrowLeftRight, Home
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
  { to: '/admin/catalog', label: 'Catalogo', icon: Box },
  { to: '/admin/clients', label: 'Clienti', icon: Users },
];

export function AppSidebar({ role, onRoleToggle }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const links = role === 'client' ? clientLinks : internalLinks;

  return (
    <aside
      className={cn(
        'flex flex-col bg-background text-foreground border-r border-border/60 transition-all duration-500 ease-out h-screen sticky top-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand */}
      <Link
        to="/"
        className={cn(
          'flex items-center h-20 border-b border-border/60 transition-all',
          collapsed ? 'justify-center px-2' : 'px-6'
        )}
      >
        {collapsed ? (
          <Home className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <div className="flex flex-col leading-tight">
            <span className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground font-light">
              Portale
            </span>
            <span className="text-sm tracking-[0.18em] uppercase font-light mt-1">
              Imballaggi Bustesi
            </span>
          </div>
        )}
      </Link>

      {/* Section label */}
      {!collapsed && (
        <div className="px-6 pt-6 pb-3">
          <span className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground font-light">
            {role === 'client' ? 'Area Cliente' : 'Area Interna'}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn('flex-1 space-y-1', collapsed ? 'px-2 pt-6' : 'px-3')}>
        {links.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 rounded-full transition-all duration-300',
                collapsed ? 'justify-center h-10 w-10 mx-auto' : 'px-4 py-2.5',
                active
                  ? 'bg-foreground text-background'
                  : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
              )}
            >
              <link.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              {!collapsed && (
                <span className="text-[0.7rem] tracking-[0.2em] uppercase font-light">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className={cn('space-y-1 pb-5', collapsed ? 'px-2' : 'px-3')}>
        <div className={cn('border-t border-border/60 mb-4', collapsed ? 'mx-1' : 'mx-1')} />
        <button
          onClick={onRoleToggle}
          className={cn(
            'flex items-center gap-3 rounded-full transition-all w-full text-foreground/70 hover:bg-secondary hover:text-foreground',
            collapsed ? 'justify-center h-10' : 'px-4 py-2.5'
          )}
        >
          <ArrowLeftRight className="w-4 h-4 shrink-0" strokeWidth={1.5} />
          {!collapsed && (
            <span className="text-[0.65rem] tracking-[0.2em] uppercase font-light">
              {role === 'client' ? 'Pannello Interno' : 'Portale Cliente'}
            </span>
          )}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'flex items-center gap-3 rounded-full transition-all w-full text-foreground/50 hover:bg-secondary hover:text-foreground',
            collapsed ? 'justify-center h-10' : 'px-4 py-2.5'
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" strokeWidth={1.5} /> : <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />}
          {!collapsed && (
            <span className="text-[0.65rem] tracking-[0.2em] uppercase font-light">Comprimi</span>
          )}
        </button>
      </div>
    </aside>
  );
}

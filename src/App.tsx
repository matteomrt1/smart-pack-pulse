import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserRole } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import Landing from '@/pages/Landing';
import ClientDashboard from '@/pages/client/Dashboard';
import Catalog from '@/pages/client/Catalog';
import Configurator from '@/pages/client/Configurator';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCatalog from '@/pages/admin/AdminCatalog';
import AdminClients from '@/pages/admin/AdminClients';
import NotFound from './pages/NotFound';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  const [role, setRole] = useState<UserRole>('client');
  const toggleRole = () => setRole(r => r === 'client' ? 'internal' : 'client');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />

            {/* Client portal */}
            <Route element={<AppLayout role={role} onRoleToggle={toggleRole} />}>
              <Route path="/dashboard" element={<ClientDashboard />} />
              <Route path="/configurator" element={<Configurator />} />
              <Route path="/catalog" element={<Catalog />} />

              {/* Admin panel */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/catalog" element={<AdminCatalog />} />
              <Route path="/admin/clients" element={<AdminClients />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

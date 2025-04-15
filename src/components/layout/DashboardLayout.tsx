
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, Calendar, Home, Menu, Package, Users, FileText, LogOut, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, onClick }) => {
  return (
    <Link to={to} onClick={onClick} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const navItems = [
    { to: '/', icon: <Home size={18} />, label: 'Dashboard' },
    { to: '/patients', icon: <Users size={18} />, label: 'Patients' },
    { to: '/appointments', icon: <Calendar size={18} />, label: 'Appointments' },
    { to: '/billing', icon: <FileText size={18} />, label: 'Billing' },
    { to: '/inventory', icon: <Package size={18} />, label: 'Inventory' },
    { to: '/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside 
        className={cn(
          "bg-sidebar shadow-medium border-r border-sidebar-border transition-all duration-300 ease-in-out",
          "fixed z-30 flex h-full w-64 flex-col",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && sidebarOpen && "translate-x-0"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4 bg-sidebar-accent">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-sidebar-primary">CareWave</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X size={18} className="text-sidebar-foreground" />
            </Button>
          )}
        </div>

        {/* User info with slight style adjustments */}
        <div className="flex flex-col px-4 py-4 bg-sidebar-accent/50">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center shadow-subtle">
              {user?.name?.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="font-medium text-sidebar-foreground">{user?.name}</p>
              <p className="text-sm text-sidebar-foreground/70">{user?.role}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Navigation with hover and active state refinements */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.to}
              onClick={closeSidebar}
            />
          ))}
        </nav>

        <div className="p-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 hover:bg-sidebar-accent/30 transition-colors"
            onClick={() => {
              logout();
              closeSidebar();
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content area with refined styling */}
      <div className={cn(
        "flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out",
        "bg-background shadow-sm",
        sidebarOpen && !isMobile && "ml-64",
      )}>
        <header className="flex h-14 items-center border-b bg-card px-4 shadow-subtle">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="mr-2 hover:bg-accent/30"
            >
              <Menu size={18} className="text-foreground" />
            </Button>
          )}
          <h1 className="text-lg font-medium text-foreground animate-subtle-pulse">
            {navItems.find(item => item.to === location.pathname)?.label || 'Dashboard'}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">{children}</main>
      </div>

      {/* Mobile overlay with backdrop blur */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-background/70 backdrop-blur-sm" 
          onClick={closeSidebar}
        />
      )}
    </div>
  );
};

export default DashboardLayout;


import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import SidebarContent from './SidebarContent';
import HeaderContent from './HeaderContent';
import MainContent from './MainContent';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const navItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/patients', label: 'Patients' },
    { to: '/appointments', label: 'Appointments' },
    { to: '/billing', label: 'Billing' },
    { to: '/inventory', label: 'Inventory' },
    { to: '/analytics', label: 'Analytics' },
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
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar shadow-medium border-r border-sidebar-border transition-all duration-300 ease-in-out",
          "fixed z-30 flex h-full w-64 flex-col",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && sidebarOpen && "translate-x-0"
        )}
      >
        <SidebarContent closeSidebar={closeSidebar} />
      </aside>

      {/* Main content area */}
      <div className={cn(
        "flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out",
        "bg-background shadow-sm",
        sidebarOpen && !isMobile && "ml-64",
      )}>
        <HeaderContent 
          isMobile={isMobile} 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          navItems={navItems}
        />

        <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
          {children}
        </MainContent>
      </div>

      {/* Mobile overlay */}
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

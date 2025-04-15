
import React from 'react';
import { useLocation } from 'react-router-dom';
import MobileMenuToggle from './MobileMenuToggle';

interface HeaderContentProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  navItems: Array<{ to: string; label: string }>;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ 
  isMobile, 
  sidebarOpen, 
  toggleSidebar, 
  navItems 
}) => {
  const location = useLocation();
  
  return (
    <header className="flex h-14 items-center border-b bg-card px-4 shadow-subtle">
      {isMobile && (
        <MobileMenuToggle 
          isOpen={sidebarOpen} 
          onToggle={toggleSidebar} 
        />
      )}
      <h1 className="text-lg font-medium text-foreground animate-subtle-pulse">
        {navItems.find(item => item.to === location.pathname)?.label || 'Dashboard'}
      </h1>
    </header>
  );
};

export default HeaderContent;

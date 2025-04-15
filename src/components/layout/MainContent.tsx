
import React from 'react';
import { cn } from '@/lib/utils';

interface MainContentProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  isMobile: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ children, sidebarOpen, isMobile }) => {
  return (
    <main className={cn(
      "flex-1 overflow-y-auto p-4 md:p-6 bg-background",
    )}>
      {children}
    </main>
  );
};

export default MainContent;

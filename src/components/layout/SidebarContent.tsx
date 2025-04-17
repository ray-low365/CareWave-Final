
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Users, Calendar, FileText, Package, BarChart3, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, onClick }) => {
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

interface SidebarContentProps {
  closeSidebar: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ closeSidebar }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: <Home size={18} />, label: 'Dashboard' },
    { to: '/patients', icon: <Users size={18} />, label: 'Patients' },
    { to: '/appointments', icon: <Calendar size={18} />, label: 'Appointments' },
    { to: '/billing', icon: <FileText size={18} />, label: 'Billing' },
    { to: '/inventory', icon: <Package size={18} />, label: 'Inventory' },
    { to: '/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
  ];

  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  // Get first letter of email for avatar
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  // Extract email display name (before @)
  const displayName = user?.email ? user.email.split('@')[0] : 'User';

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4 bg-sidebar-accent">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-sidebar-primary">CareWave</span>
        </div>
      </div>

      <div className="flex flex-col px-4 py-4 bg-sidebar-accent/50">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center shadow-subtle">
            {userInitial}
          </div>
          <div className="ml-3">
            <p className="font-medium text-sidebar-foreground">{displayName}</p>
            <p className="text-sm text-sidebar-foreground/70">{user?.email || 'Staff'}</p>
          </div>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

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
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );
};

export default SidebarContent;

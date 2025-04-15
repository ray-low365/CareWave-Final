
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={onToggle} 
      className="mr-2 hover:bg-accent/30"
    >
      {isOpen ? (
        <X size={18} className="text-foreground" />
      ) : (
        <Menu size={18} className="text-foreground" />
      )}
    </Button>
  );
};

export default MobileMenuToggle;

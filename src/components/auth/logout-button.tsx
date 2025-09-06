'use client';

import { Button } from '@/components/ui/button';
import { useAuthHook } from '@/hooks/useAuthHook';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({
  variant = 'destructive',
  size = 'default',
  className = '',
  children,
}: LogoutButtonProps) {
  const { logoutMutation, isLogoutPending } = useAuthHook();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLogoutPending}
    >
      <LogOut className='mr-2 h-4 w-4' />
      {children || (isLogoutPending ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج')}
    </Button>
  );
}


import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  loading = false,
  icon,
  children,
  disabled,
  className,
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('🔘 Button clicked:', children);
    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  return (
    <ShadcnButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      className={cn(
        'transition-all duration-200',
        loading && 'cursor-not-allowed opacity-70',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </ShadcnButton>
  );
};

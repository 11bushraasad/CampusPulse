import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter, type Route } from '@/router';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  to?: Route;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  icon,
}: ButtonProps) {
  const { navigate } = useRouter();

  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2';

  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft hover:shadow-lift',
    secondary: 'bg-ink-900 text-white hover:bg-ink-800 shadow-soft hover:shadow-lift',
    accent: 'bg-accent-500 text-ink-900 hover:bg-accent-400 shadow-soft hover:shadow-lift',
    outline: 'border-2 border-ink-200 text-ink-700 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50',
    ghost: 'text-ink-700 hover:bg-ink-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const handleClick = () => {
    if (to) navigate(to);
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
    if (onClick) onClick();
  };

  if (to || href || onClick) {
    return (
      <button onClick={handleClick} className={classes}>
        {children}
        {icon}
      </button>
    );
  }

  return (
    <button className={classes}>
      {children}
      {icon}
    </button>
  );
}

interface LinkButtonProps {
  children: ReactNode;
  to: Route;
  className?: string;
}

export function LinkButton({ children, to, className = '' }: LinkButtonProps) {
  const { navigate } = useRouter();
  return (
    <button
      onClick={() => navigate(to)}
      className={`inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:gap-2 transition-all duration-200 ${className}`}
    >
      {children}
      <ChevronRight className="w-4 h-4" />
    </button>
  );
}

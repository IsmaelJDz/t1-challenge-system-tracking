import React from 'react';
import { Loader2 } from 'lucide-react'; // Icono de carga
import { useTracking } from '../../hooks/use-tracking';

// Definimos las propiedades (Props) estrictamente como pide el PDF
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  leftIcon?: React.ReactNode; // Icono opcional a la izquierda
  children: React.ReactNode;
}

const Button = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  children,
  className = '',
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const { track } = useTracking();

  // Mapeo de estilos según la variante (usando nuestros tokens de Tailwind)
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary-hover focus:ring-secondary',
    danger:
      'bg-danger text-danger-foreground hover:bg-danger-hover focus:ring-danger',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Ejecutar el tracking automático
    track({
      component: 'Button',
      variant,
      action: 'click',
    });

    // 2. Ejecutar la función original onClick si existe
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}>
      {/* Si está cargando, mostramos spinner. Si no, mostramos icono opcional */}
      {isLoading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : leftIcon ? (
        <span className='mr-2'>{leftIcon}</span>
      ) : null}

      {children}
    </button>
  );
};

export { Button };

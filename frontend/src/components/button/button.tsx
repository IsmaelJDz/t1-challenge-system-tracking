import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTracking } from '../../hooks/use-tracking';
import { ButtonProps } from './button.types';
import {
  BUTTON_BASE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  BUTTON_SIZE_CLASSES,
} from './button.constants';

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  children,
  className = '',
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const { track } = useTracking();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    track({
      component: 'Button',
      variant,
      action: 'click',
    });

    if (onClick) onClick(e);
  };

  const variantClasses = BUTTON_VARIANT_CLASSES[variant];
  const sizeClasses = BUTTON_SIZE_CLASSES[size];

  return (
    <button
      className={`${BUTTON_BASE_CLASSES} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      {...props}
    >
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

// Comentario de prueba

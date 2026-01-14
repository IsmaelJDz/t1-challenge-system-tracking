'use client';

import { useTracking } from '../../hooks/use-tracking';
import { CardProps } from './card.types';
import { CARD_BASE_CLASSES, CARD_VARIANT_CLASSES } from './card.constants';

export const Card = ({
  title,
  footer,
  image,
  variant = 'shadow',
  children,
  className = '',
  onClick,
}: CardProps) => {
  const { track } = useTracking();

  const handleClick = () => {
    if (onClick) {
      track({
        component: 'Card',
        action: 'click',
        variant,
      });
      onClick();
    }
  };

  const variantClasses = CARD_VARIANT_CLASSES[variant];

  return (
    <div
      className={`${CARD_BASE_CLASSES} ${variantClasses} ${className}`}
      onClick={handleClick}
    >
      {image && (
        <div className='w-full h-48 overflow-hidden'>
          <img
            src={image}
            alt={title || 'Card image'}
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>
      )}

      {title && (
        <div className='px-6 py-4 border-b border-gray-100'>
          <h3 className='font-bold text-xl text-gray-800'>{title}</h3>
        </div>
      )}

      <div className='px-6 py-4 text-gray-600'>{children}</div>

      {footer && (
        <div className='px-6 py-4 bg-gray-50 border-t border-gray-100 text-sm'>
          {footer}
        </div>
      )}
    </div>
  );
};

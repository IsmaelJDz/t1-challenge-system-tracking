'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTracking } from '../../hooks/use-tracking';
import {
  MODAL_SIZE_CLASSES,
  MODAL_OVERLAY_CLASSES,
  MODAL_CONTENT_CLASSES,
} from './modal.constants';
import { ModalProps } from './modal.types';

export const Modal = ({
  isOpen,
  onClose,
  title,
  footer,
  size = 'md',
  children,
}: ModalProps) => {
  const { track } = useTracking();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = (origin: string) => {
    track({
      component: 'Modal',
      action: 'close',
      metadata: { origin },
    });
    onClose();
  };

  const sizeClasses = MODAL_SIZE_CLASSES[size];

  return (
    <div
      className={MODAL_OVERLAY_CLASSES}
      onClick={() => handleClose('overlay')}
      role='dialog'
      aria-modal='true'
    >
      <div
        className={`${MODAL_CONTENT_CLASSES} ${sizeClasses}`}
        onClick={e => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {title || 'Modal'}
          </h3>
          <button
            onClick={() => handleClose('close-button')}
            className='text-gray-400 hover:text-gray-500 transition-colors'
            aria-label='Cerrar modal'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-6'>{children}</div>

        {footer && (
          <div className='bg-gray-50 px-6 py-4 border-t flex justify-end gap-2'>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

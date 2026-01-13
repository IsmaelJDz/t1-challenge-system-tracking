'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTracking } from '../../hooks/use-tracking';
import { sizeClasses } from './modal.constants';
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

  // Efecto para cerrar con la tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Si no está abierto, no renderizamos nada (null)
  if (!isOpen) return null;

  const handleClose = (origin: string) => {
    // Tracking del cierre
    track({
      component: 'Modal',
      action: 'close',
      metadata: { origin }, // Saber si cerró por la "X" o el "overlay"
    });
    onClose();
  };

  return (
    // Overlay (fondo oscuro)
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200'
      onClick={() => handleClose('overlay')} // Cierra al clickear afuera
      role='dialog' // Accesibilidad
      aria-modal='true'>
      {/* Contenido del Modal */}
      {/* stopPropagation evita que el click dentro del modal cierre el overlay */}
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} overflow-hidden animate-in zoom-in-95 duration-200`}
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b'>
          <h3 className='text-lg font-semibold text-gray-900'>
            {title || 'Modal'}
          </h3>
          <button
            onClick={() => handleClose('close-button')}
            className='text-gray-400 hover:text-gray-500 transition-colors'
            aria-label='Cerrar modal'>
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Body */}
        <div className='p-6'>{children}</div>

        {/* Footer (Opcional) */}
        {footer && (
          <div className='bg-gray-50 px-6 py-4 border-t flex justify-end gap-2'>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useTracking } from '../../hooks/use-tracking';
import { CheckCircle, AlertCircle } from 'lucide-react'; // Iconos para validación

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // Si hay texto aquí, estado = error
  success?: boolean; // Si es true, estado = success
}

export const Input = ({
  label,
  error,
  success,
  className = '',
  onBlur,
  name,
  disabled,
  id,
  ...props
}: InputProps) => {
  const { track } = useTracking();
  const generatedId = React.useId();

  // Generar un ID único si no se proporciona uno
  const inputId = id || generatedId;

  // Tracking inteligente: solo cuando el usuario deja el campo
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    track({
      component: 'Input',
      variant: props.type || 'text',
      action: 'blur', // Indica que terminó de interactuar
      metadata: { name: name || 'unnamed-input' },
    });

    if (onBlur) onBlur(e);
  };

  // Definir colores de borde según estado
  let borderColor =
    'border-gray-300 focus:border-primary focus:ring-primary';
  let icon = null;

  if (error) {
    borderColor =
      'border-danger text-danger focus:border-danger focus:ring-danger';
    icon = (
      <AlertCircle className='w-5 h-5 text-danger absolute right-3 top-9' />
    );
  } else if (success) {
    borderColor =
      'border-success text-success focus:border-success focus:ring-success';
    icon = (
      <CheckCircle className='w-5 h-5 text-success absolute right-3 top-9' />
    );
  }

  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className='text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`px-4 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:bg-gray-100 ${borderColor}`}
        onBlur={handleBlur}
        disabled={disabled}
        name={name}
        {...props}
      />

      {/* Icono de estado (Error/Success) */}
      {icon}

      {/* Mensaje de error visible */}
      {error && <span className='text-xs text-danger'>{error}</span>}
    </div>
  );
};

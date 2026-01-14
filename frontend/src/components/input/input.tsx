import React from 'react';
import { useTracking } from '../../hooks/use-tracking';
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Mail,
  Eye,
  EyeOff,
} from 'lucide-react';
import { InputProps } from './input.types';
import {
  INPUT_BASE_CLASSES,
  INPUT_STATE_CLASSES,
  INPUT_SIZE_CLASSES,
  INPUT_LABEL_CLASSES,
  INPUT_ERROR_TEXT_CLASSES,
  INPUT_HELPER_TEXT_CLASSES,
} from './input.constants';

export const Input = ({
  label,
  error,
  success,
  warning,
  helperText,
  size = 'md',
  type = 'text',
  className = '',
  onBlur,
  name,
  disabled,
  id,
  ...props
}: InputProps) => {
  const { track } = useTracking();
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    track({
      component: 'Input',
      variant: type,
      action: 'blur',
      metadata: { name: name || 'unnamed-input' },
    });

    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getInputState = () => {
    if (error) return 'error';
    if (warning) return 'warning';
    if (success) return 'success';
    return 'default';
  };

  const inputState = getInputState();
  const borderClasses = INPUT_STATE_CLASSES[inputState];
  const sizeClasses = INPUT_SIZE_CLASSES[size];

  const getIcon = () => {
    if (error) {
      return (
        <AlertCircle className='w-5 h-5 text-danger absolute right-3 top-9' />
      );
    }
    if (warning) {
      return (
        <AlertTriangle className='w-5 h-5 text-warning absolute right-3 top-9' />
      );
    }
    if (success) {
      return (
        <CheckCircle className='w-5 h-5 text-success absolute right-3 top-9' />
      );
    }

    if (type === 'email') {
      return <Mail className='w-5 h-5 text-gray-400 absolute right-3 top-9' />;
    }

    if (type === 'password') {
      return (
        <button
          type='button'
          onClick={togglePasswordVisibility}
          className='absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none'
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className='w-5 h-5' />
          ) : (
            <Eye className='w-5 h-5' />
          )}
        </button>
      );
    }

    return null;
  };

  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      {label && (
        <label htmlFor={inputId} className={INPUT_LABEL_CLASSES}>
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type === 'password' && showPassword ? 'text' : type}
        className={`${INPUT_BASE_CLASSES} ${sizeClasses} ${borderClasses}`}
        onBlur={handleBlur}
        disabled={disabled}
        name={name}
        {...props}
      />

      {getIcon()}

      {error && <span className={INPUT_ERROR_TEXT_CLASSES}>{error}</span>}
      {!error && helperText && (
        <span className={INPUT_HELPER_TEXT_CLASSES}>{helperText}</span>
      )}
    </div>
  );
};

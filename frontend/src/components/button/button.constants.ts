export const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

export const BUTTON_VARIANT_CLASSES = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary-hover focus:ring-secondary',
  danger:
    'bg-danger text-danger-foreground hover:bg-danger-hover focus:ring-danger',
  success:
    'bg-success text-success-foreground hover:bg-success-hover focus:ring-success',
  warning:
    'bg-warning text-warning-foreground hover:bg-warning-hover focus:ring-warning',
  info: 'bg-info text-info-foreground hover:bg-info-hover focus:ring-info',
  outline:
    'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  ghost: 'bg-transparent text-primary hover:bg-gray-100',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0',
} as const;

export const BUTTON_SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
} as const;

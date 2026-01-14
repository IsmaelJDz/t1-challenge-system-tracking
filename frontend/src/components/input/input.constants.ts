export const INPUT_BASE_CLASSES =
  'px-4 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors disabled:opacity-50 disabled:bg-gray-100';

export const INPUT_STATE_CLASSES = {
  default: 'border-gray-300 focus:border-primary focus:ring-primary',
  error: 'border-danger text-danger focus:border-danger focus:ring-danger',
  success:
    'border-success text-success focus:border-success focus:ring-success',
  warning:
    'border-warning text-warning focus:border-warning focus:ring-warning',
} as const;

export const INPUT_SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
} as const;

export const INPUT_LABEL_CLASSES = 'text-sm font-medium text-gray-700';

export const INPUT_ERROR_TEXT_CLASSES = 'text-xs text-danger';

export const INPUT_HELPER_TEXT_CLASSES = 'text-xs text-gray-500';

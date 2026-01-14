export const MODAL_SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
} as const;

export const MODAL_OVERLAY_CLASSES =
  'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200';

export const MODAL_CONTENT_CLASSES =
  'bg-white rounded-lg shadow-xl w-full overflow-hidden animate-in zoom-in-95 duration-200';

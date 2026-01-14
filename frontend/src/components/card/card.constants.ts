export const CARD_BASE_CLASSES = 'rounded-xl overflow-hidden';

export const CARD_VARIANT_CLASSES = {
  simple: 'bg-white',
  shadow: 'bg-white shadow-md hover:shadow-lg transition-shadow',
  bordered: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-xl hover:shadow-2xl transition-shadow',
  outline: 'bg-transparent border-2 border-gray-300',
} as const;

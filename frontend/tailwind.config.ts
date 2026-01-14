import type { Config } from 'tailwindcss';

const designTokens = {
  colors: {
    primary: '#2563EB',
    'primary-hover': '#1D4ED8',
    'primary-foreground': '#FFFFFF',

    secondary: '#64748B',
    'secondary-hover': '#475569',
    'secondary-foreground': '#FFFFFF',

    danger: '#EF4444',
    'danger-hover': '#DC2626',
    'danger-foreground': '#FFFFFF',

    success: '#22C55E',
    'success-hover': '#16A34A',
    'success-foreground': '#FFFFFF',

    warning: '#F59E0B',
    'warning-hover': '#D97706',
    'warning-foreground': '#FFFFFF',

    info: '#3B82F6',
    'info-hover': '#2563EB',
    'info-foreground': '#FFFFFF',

    background: '#F8FAFC',
    surface: '#FFFFFF',
    'overlay-bg': 'rgba(0, 0, 0, 0.5)',

    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    DEFAULT: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  transitionDuration: {
    fast: '150ms',
    DEFAULT: '200ms',
    slow: '300ms',
  },
  zIndex: {
    dropdown: '10',
    modal: '50',
    tooltip: '100',
  },
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: designTokens,
  },
  plugins: [],
};
export default config;

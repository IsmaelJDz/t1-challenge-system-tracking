import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // --- DESIGN TOKENS ---
      colors: {
        // Colores semánticos requeridos por el PDF
        primary: {
          DEFAULT: '#2563EB', // Azul vibrante
          hover: '#1D4ED8',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#64748B', // Gris azulado neutro
          hover: '#475569',
          foreground: '#FFFFFF',
        },
        danger: {
          DEFAULT: '#EF4444', // Rojo alerta
          hover: '#DC2626',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#22C55E', // Verde éxito
          hover: '#16A34A',
        },
        background: '#F8FAFC', // Fondo general suave
        surface: '#FFFFFF', // Fondo de tarjetas/modales
      },
      borderRadius: {
        DEFAULT: '0.375rem', // 6px
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      // ---------------------
    },
  },
  plugins: [],
};
export default config;

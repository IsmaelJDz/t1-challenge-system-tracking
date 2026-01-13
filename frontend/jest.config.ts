import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Ubicación de tu app Next.js para cargar archivos .env y configuración
  dir: './',
});

// Configuración personalizada de Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Archivo de setup que crearemos en el paso 3
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Ignorar carpetas de node_modules y .next
  moduleNameMapper: {
    // Si usaras alias de rutas (ej: @/components/...), aquí se configurarían.
    // Como decidimos no usarlos en el wizard, esto queda vacío o por defecto.
  },

  // Configuración de Coverage (Requisito del PDF: 80%)
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}', // Solo nos interesa testear los componentes
    '!src/components/**/index.ts', // Ignorar archivos de barril (exports)
    '!src/components/**/*.types.ts', // Ignorar archivos de tipos (solo interfaces/types)
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default createJestConfig(config);

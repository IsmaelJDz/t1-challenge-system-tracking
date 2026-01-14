# Frontend - T1 Component Library

Aplicación Next.js con sistema de componentes reutilizables, design system completo y tracking automático de interacciones.

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Scripts Disponibles](#scripts-disponibles)
5. [Arquitectura de Componentes](#arquitectura-de-componentes)
6. [Design System](#design-system)
7. [Testing](#testing)
8. [Páginas y Rutas](#páginas-y-rutas)
9. [Hooks Personalizados](#hooks-personalizados)
10. [Git Hooks con Husky](#git-hooks-con-husky)
11. [Documentación Adicional](#documentación-adicional)

---

## 🎯 Descripción General

Aplicación frontend desarrollada con **Next.js 16** (App Router) que incluye:

- 🎨 **Design System completo** con 8 categorías de tokens
- 🧩 **4 componentes principales** (Button, Input, Card, Modal)
- 📊 **Tracking automático** de interacciones de usuario
- 🔐 **Autenticación** con guards y JWT
- ✅ **Testing completo** con +80% de cobertura
- 💅 **Tailwind CSS v4** con custom properties

**Stack Tecnológico:**

- **Framework:** Next.js 16.1.1
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Estilos:** Tailwind CSS v4
- **Testing:** Jest 30 + React Testing Library 16
- **Iconos:** Lucide React 0.562
- **Formateo:** Prettier 3.7.4

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── globals.css             # Estilos globales + CSS vars
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx                # Página de inicio
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard con analytics
│   │   └── login/
│   │       └── page.tsx            # Página de login
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── button/
│   │   │   ├── button.tsx          # Componente
│   │   │   ├── button.types.ts     # Tipos TypeScript
│   │   │   ├── button.constants.ts # Variantes y clases
│   │   │   └── index.ts            # Barrel export
│   │   ├── input/
│   │   ├── card/
│   │   ├── modal/
│   │   ├── __tests__/              # Tests unitarios
│   │   │   ├── button.test.tsx
│   │   │   ├── input.test.tsx
│   │   │   ├── card.test.tsx
│   │   │   └── modal.test.tsx
│   │   └── index.ts                # Export de todos los componentes
│   │
│   └── hooks/                      # Custom hooks
│       ├── use-tracking.ts         # Hook de analytics
│       └── use-tracking.types.ts
│
├── scripts/
│   └── sync-tokens.ts              # Script de sincronización
│
├── public/                         # Assets estáticos
├── .vscode/                        # Config de VS Code
│   └── settings.json               # Format on save
├── .prettierrc                     # Config de Prettier
├── .prettierignore                 # Archivos a ignorar
├── tailwind.config.ts              # Fuente de verdad de tokens
├── jest.config.ts                  # Configuración de Jest
├── jest.setup.ts                   # Setup de testing
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── DESIGN_SYSTEM.md                # Doc del design system
├── README_SYNC_TOKENS.md           # Doc de sincronización
└── README.md                       # Este archivo
```

---

## ⚙️ Instalación y Configuración

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Backend corriendo en `http://localhost:5000`

### Paso 1: Instalar Dependencias

```bash
cd frontend
npm install
```

### Paso 2: Levantar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Paso 3: Verificar Funcionamiento

1. Abre `http://localhost:3000`
2. Crea una cuenta en `/login`
3. Accede al `/dashboard`
4. Prueba los componentes interactivos

---

## 🚀 Scripts Disponibles

```json
{
  "dev": "next dev", // Servidor de desarrollo
  "build": "next build", // Build de producción
  "start": "next start", // Servidor de producción
  "lint": "eslint", // Linting
  "test": "jest", // Tests unitarios
  "test:watch": "jest --watch", // Tests en modo watch
  "test:coverage": "jest --coverage", // Tests con coverage
  "sync-tokens": "ts-node scripts/sync-tokens.ts", // Sincronizar tokens
  "format": "prettier --write ...", // Formatear código
  "format:check": "prettier --check ..." // Verificar formato
}
```

### Comandos Importantes

**Desarrollo:**

```bash
npm run dev          # Levanta servidor con hot-reload
npm run test:watch   # Tests en modo watch
npm run format       # Formatea todo el código
```

**Testing:**

```bash
npm test             # Corre todos los tests
npm run test:coverage # Genera reporte de cobertura
```

**Design Tokens:**

```bash
npm run sync-tokens  # Sincroniza tailwind.config.ts → globals.css
```

---

## 🧩 Arquitectura de Componentes

Todos los componentes siguen la misma estructura modular:

```
component/
├── component.tsx          # Implementación del componente
├── component.types.ts     # Tipos e interfaces TypeScript
├── component.constants.ts # Variantes, clases CSS, configuración
└── index.ts               # Export barrel
```

### Patrón de Nomenclatura

Todos los archivos de constantes siguen el patrón:

```typescript
export const COMPONENT_TYPE_CLASSES = { ... }
```

Ejemplos:

- `BUTTON_VARIANT_CLASSES`
- `INPUT_SIZE_CLASSES`
- `CARD_VARIANT_CLASSES`
- `MODAL_SIZE_CLASSES`

### Componentes Disponibles

#### 1. Button

**Variantes:** primary, secondary, danger, success, warning, info, outline, ghost, link

**Tamaños:** sm, md, lg

**Props especiales:**

- `isLoading` - Muestra spinner
- `leftIcon` - Icono a la izquierda del texto

**Ejemplo:**

```tsx
import { Button } from '@/components';

<Button variant='primary' size='md' isLoading={false} leftIcon={<Icon />}>
  Click me
</Button>;
```

---

#### 2. Input

**Tipos:** text, email, password

**Estados:** default, error, success, warning

**Tamaños:** sm, md, lg

**Props especiales:**

- `label` - Etiqueta del input
- `error` - Mensaje de error
- `success` - Estado de éxito
- `warning` - Estado de advertencia
- `helperText` - Texto de ayuda

**Características:**

- Icono de email automático para `type="email"`
- Toggle show/hide para `type="password"`
- Iconos de estado (CheckCircle, AlertCircle, AlertTriangle)

**Ejemplo:**

```tsx
import { Input } from '@/components';

<Input
  type='email'
  label='Correo'
  size='md'
  helperText='Ingresa tu email'
  error='Email inválido'
/>;
```

---

#### 3. Card

**Variantes:** simple, shadow, bordered, elevated, outline

**Props especiales:**

- `title` - Título de la card
- `footer` - Contenido del footer
- `image` - URL de imagen superior
- `onClick` - Callback al hacer clic

**Ejemplo:**

```tsx
import { Card } from '@/components';

<Card
  variant='shadow'
  title='Título'
  image='/image.jpg'
  footer={<Button>Action</Button>}
>
  Contenido de la tarjeta
</Card>;
```

---

#### 4. Modal

**Tamaños:** sm, md, lg, xl

**Props:**

- `isOpen` - Estado de apertura
- `onClose` - Callback al cerrar
- `title` - Título del modal
- `footer` - Contenido del footer

**Características:**

- Cierre con Escape
- Cierre clickeando fuera
- Animaciones de entrada/salida

**Ejemplo:**

```tsx
import { Modal } from '@/components';

<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  size='md'
  title='Modal Title'
  footer={<Button>Close</Button>}
>
  Contenido del modal
</Modal>;
```

---

## 🎨 Design System

El proyecto cuenta con un **sistema completo de design tokens** organizados en 8 categorías:

### Tokens Disponibles

**1. Colores (22 valores)**

- Primary, Secondary, Danger, Success, Warning, Info
- Variantes hover y foreground
- Escala de grises (gray-50 a gray-900)

**2. Espaciado (6 valores)**

- xs, sm, md, lg, xl, 2xl

**3. Tipografía**

- Tamaños: xs, sm, base, lg, xl, 2xl, 3xl
- Pesos: normal, medium, semibold, bold

**4. Border Radius (5 valores)**

- sm, default, md, lg, xl

**5. Sombras (5 niveles)**

- sm, default, md, lg, xl

**6. Animaciones (3 velocidades)**

- fast (150ms), default (200ms), slow (300ms)

**7. Z-Index (3 niveles)**

- dropdown (10), modal (50), tooltip (100)

**8. Otros**

- Background, surface, bordes, etc.

### Sincronización de Tokens

**Fuente de Verdad:** `tailwind.config.ts`

**Proceso:**

1. Modificar tokens en `tailwind.config.ts`
2. Ejecutar `npm run sync-tokens`
3. Los cambios se aplican automáticamente en `globals.css`

**Documentación completa:** Ver [README_SYNC_TOKENS.md](README_SYNC_TOKENS.md)

**Guía de uso:** Ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)

---

## ✅ Testing

El proyecto tiene **+80% de cobertura** en todas las métricas.

### Configuración

**Framework:** Jest 30 + React Testing Library 16

**Coverage mínimo requerido:**

```typescript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

### Estructura de Tests

Todos los tests están en `src/components/__tests__/`:

- `button.test.tsx`
- `input.test.tsx`
- `card.test.tsx`
- `modal.test.tsx`

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Con coverage
npm run test:coverage

# Modo watch
npm run test:watch
```

### Cobertura Actual

```
Statements: 99.49%
Branches:   91.66%
Functions:  93.33%
Lines:      99.49%
```

### Qué se Testea

✅ Renderizado de componentes
✅ Props y variantes
✅ Estados (error, success, warning, loading)
✅ Interacciones de usuario (click, blur, toggle)
✅ Tracking automático
✅ Accesibilidad (labels, aria-\*)
✅ Condicionales y lógica de negocio

---

## 📄 Páginas y Rutas

### 1. Home (`/`)

**Archivo:** `src/app/page.tsx`

**Descripción:** Página de bienvenida con redirección automática a dashboard si está autenticado.

**Características:**

- Verificación de autenticación
- Loader mientras verifica
- Redirección automática

---

### 2. Login (`/login`)

**Archivo:** `src/app/login/page.tsx`

**Descripción:** Página de autenticación (login/registro).

**Características:**

- Formulario de email + password
- Toggle entre login y registro
- Validación de campos
- Almacena JWT en localStorage
- Redirección a dashboard tras login exitoso

**Endpoints usados:**

- `POST /api/auth/login`
- `POST /api/auth/register`

---

### 3. Dashboard (`/dashboard`)

**Archivo:** `src/app/dashboard/page.tsx`

**Descripción:** Panel principal con componentes interactivos y analytics en tiempo real.

**Características:**

- Auth guard (redirige a login si no autenticado)
- Ejemplos de todos los componentes
- Tabla de estadísticas en vivo desde MongoDB
- Botón de exportación CSV
- Botón de logout

**Secciones:**

1. Botones de prueba (diferentes variantes)
2. Inputs de prueba (text, email, password, estados)
3. Modal demo
4. Panel de estadísticas con tabla
5. Exportación CSV protegida con JWT

**Endpoints usados:**

- `GET /api/components/stats`
- `GET /api/components/export` (requiere auth)

---

## 🪝 Hooks Personalizados

### useTracking

**Archivo:** `src/hooks/use-tracking.ts`

**Descripción:** Hook para enviar eventos de tracking al backend automáticamente.

**Uso:**

```tsx
import { useTracking } from '@/hooks/use-tracking';

const { track } = useTracking();

track({
  component: 'Button',
  variant: 'primary',
  action: 'click',
  metadata: { page: '/dashboard' },
});
```

**Parámetros:**

- `component` (string): Nombre del componente
- `variant` (string, opcional): Variante usada
- `action` (string): Tipo de acción
- `metadata` (object, opcional): Datos adicionales

**Endpoint:** `POST http://localhost:5000/api/components/track`

**Uso en componentes:**
Todos los componentes usan este hook automáticamente para trackear interacciones.

---

## 🎭 Formateo de Código

### Prettier

**Configuración:** `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid",
  "jsxSingleQuote": true
}
```

**VS Code:**
El proyecto incluye `.vscode/settings.json` con:

- Format on save activado
- Prettier como formatter por defecto

**Comandos:**

```bash
npm run format        # Formatear todo el código
npm run format:check  # Verificar formato sin cambiar
```

---

## 🪝 Git Hooks con Husky

El proyecto usa **Husky** para ejecutar validaciones automáticas antes de cada commit, asegurando la calidad del código.

### Configuración

**Dependencias instaladas:**

- `husky` (v9.1.7) - Git hooks manager
- `lint-staged` (v16.2.7) - Ejecuta comandos solo en archivos staged

### Pre-commit Hook

Antes de cada commit, automáticamente se ejecuta:

**Para archivos `.js`, `.jsx`, `.ts`, `.tsx`:**

1. ✅ **Prettier** - Formatea el código
2. ✅ **ESLint** - Corrige errores de linting
3. ✅ **Jest** - Ejecuta tests relacionados con los archivos modificados

**Para archivos `.json`, `.css`, `.md`:**

1. ✅ **Prettier** - Solo formatea

### Comportamiento

```bash
git add .
git commit -m "mensaje"

# Automáticamente ejecuta:
# → prettier --write (formatea archivos)
# → eslint --fix (corrige linting)
# → jest --findRelatedTests (tests de archivos modificados)
```

**Si algo falla:**

- ❌ El commit es **bloqueado**
- 💡 Debes corregir los errores antes de commitear

**Si todo pasa:**

- ✅ El commit se realiza exitosamente

### Configuración en package.json

```json
{
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "prettier --write",
      "eslint --fix",
      "jest --bail --findRelatedTests --passWithNoTests"
    ],
    "src/**/*.{json,css,md}": ["prettier --write"]
  }
}
```

### Bypass (solo en emergencias)

Si necesitas hacer un commit sin ejecutar los hooks:

```bash
git commit -m "mensaje" --no-verify
```

⚠️ **No recomendado** - Solo usar en casos excepcionales.

### Ventajas

✅ **Código siempre formateado** antes de commit
✅ **Tests ejecutados automáticamente** solo para archivos modificados
✅ **Previene commits con errores** de linting
✅ **Mantiene calidad del código** en el repositorio
✅ **Proceso automatizado** sin intervención manual

---

## 🚢 Build y Deployment

### Build de Producción

```bash
npm run build
```

Esto genera una carpeta `.next/` optimizada.

### Servidor de Producción

```bash
npm start
```

Corre el servidor de producción en `http://localhost:3000`

### Variables de Entorno

Actualmente el frontend no usa `.env`, las URLs del backend están hardcoded en:

- `src/hooks/use-tracking.ts`
- `src/app/login/page.tsx`
- `src/app/dashboard/page.tsx`

**Para producción:** Cambiar `http://localhost:5000` por la URL real del backend.

---

## 📖 Documentación Adicional

### Design System Completo

Ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) para:

- Todos los tokens de diseño
- Variantes de componentes
- Ejemplos de uso
- Guía de sincronización

### Sincronización de Tokens

Ver [README_SYNC_TOKENS.md](README_SYNC_TOKENS.md) para:

- Cómo funciona el sistema de sincronización
- Modificar tokens
- Flujo de trabajo
- Ejemplos prácticos

### Backend API

Ver [../backend/DOCUMENTATION.md](../backend/DOCUMENTATION.md) para:

- Endpoints disponibles
- Autenticación JWT
- Modelos de datos
- Integración con frontend

---

## 🔧 Configuración de TypeScript

**Archivo:** `tsconfig.json`

Configuración estricta con:

- `strict: true`
- Path aliases configurados
- Support para JSX

---

## 🎯 Características Destacadas

✅ **Componentes modulares** con separación clara de responsabilidades
✅ **Design system escalable** con 8 categorías de tokens
✅ **Testing completo** con +80% coverage
✅ **TypeScript estricto** en todo el proyecto
✅ **Tailwind v4** con CSS custom properties
✅ **Sincronización automática** de tokens
✅ **Tracking automático** de interacciones
✅ **Auth guards** en rutas protegidas
✅ **Prettier configurado** con format on save
✅ **Zero comments** policy en código

---

## 🐛 Debugging

### Logs de Tracking

El hook `useTracking` hace console.log de todos los eventos:

```
Tracking event: { component: 'Button', variant: 'primary', action: 'click' }
```

### React DevTools

Instala React DevTools para inspeccionar componentes y props.

### Next.js Debug

```bash
NODE_OPTIONS='--inspect' npm run dev
```

Abre `chrome://inspect` para debugging avanzado.

---

## 📝 Convenciones de Código

1. **Componentes:** PascalCase (`Button.tsx`)
2. **Archivos de tipos:** kebab-case con `.types.ts` (`button.types.ts`)
3. **Constantes:** UPPER_SNAKE_CASE (`BUTTON_VARIANT_CLASSES`)
4. **Hooks:** camelCase con `use` prefix (`useTracking`)
5. **Tests:** mismo nombre con `.test.tsx` (`button.test.tsx`)

---

## 🤝 Contribución

Al agregar nuevos componentes:

1. Crear carpeta con estructura estándar
2. Seguir patrón de nomenclatura de constantes
3. Agregar tests con coverage >80%
4. Documentar en DESIGN_SYSTEM.md
5. Ejecutar `npm run format` antes de commit

---

## 📌 Notas Importantes

- **Tailwind v4** usa sintaxis diferente a v3 (no permite interpolación dinámica de clases)
- Los **tokens deben sincronizarse** después de cambios en `tailwind.config.ts`
- **No subir .env** a producción (actualmente no se usa)
- Los **tests mockean el hook de tracking** para evitar llamadas HTTP reales
- El **coverage threshold es estricto** (80% mínimo)

---

## 📧 Soporte

Para dudas técnicas sobre:

- **Componentes:** Ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **Tokens:** Ver [README_SYNC_TOKENS.md](README_SYNC_TOKENS.md)
- **API:** Ver [../backend/DOCUMENTATION.md](../backend/DOCUMENTATION.md)
- **General:** Ver [../README.md](../README.md)

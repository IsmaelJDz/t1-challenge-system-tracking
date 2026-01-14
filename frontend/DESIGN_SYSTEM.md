# Design System - T1 Component Library

## 📋 Tabla de Contenidos

1. [Tokens de Diseño](#tokens-de-diseño)
2. [Componentes](#componentes)
3. [Uso y Ejemplos](#uso-y-ejemplos)
4. [Sincronización de Tokens](#sincronización-de-tokens)

---

## 🎨 Tokens de Diseño

Todos los tokens están definidos en `tailwind.config.ts` como única fuente de verdad.

### Colores

#### Primarios

- **Primary**: `#2563EB` (Azul vibrante)
  - Hover: `#1D4ED8`
  - Foreground: `#FFFFFF`

#### Secundarios

- **Secondary**: `#64748B` (Gris azulado)
  - Hover: `#475569`
  - Foreground: `#FFFFFF`

#### Estados

- **Success**: `#22C55E` (Verde)
- **Warning**: `#F59E0B` (Naranja)
- **Danger**: `#EF4444` (Rojo)
- **Info**: `#3B82F6` (Azul claro)

#### Neutrales

- **Background**: `#F8FAFC`
- **Surface**: `#FFFFFF`
- **Gray Scale**: 50-900 (completa)

### Espaciado

```typescript
xs:  4px  (0.25rem)
sm:  8px  (0.5rem)
md:  16px (1rem)
lg:  24px (1.5rem)
xl:  32px (2rem)
2xl: 48px (3rem)
```

### Tipografía

#### Tamaños

```
xs:   12px
sm:   14px
base: 16px
lg:   18px
xl:   20px
2xl:  24px
3xl:  30px
```

#### Pesos

```
normal:   400
medium:   500
semibold: 600
bold:     700
```

### Border Radius

```
sm:      4px
default: 6px
md:      8px
lg:      12px
xl:      16px
```

### Sombras

```
sm:      Sutil
default: Estándar
md:      Media
lg:      Grande
xl:      Extra grande
```

### Animaciones

```
fast:    150ms
default: 200ms
slow:    300ms
```

### Z-Index

```
dropdown: 10
modal:    50
tooltip:  100
```

---

## 🧩 Componentes

### Button

**Variantes disponibles:**

- `primary` (default) - Azul sólido
- `secondary` - Gris sólido
- `danger` - Rojo sólido
- `success` - Verde sólido
- `warning` - Naranja sólido
- `info` - Azul claro sólido
- `outline` - Solo borde
- `ghost` - Transparente con hover
- `link` - Estilo de enlace

**Tamaños:**

- `sm` - Pequeño
- `md` - Mediano (default)
- `lg` - Grande

**Props adicionales:**

- `isLoading` - Muestra spinner
- `leftIcon` - Icono a la izquierda

**Ejemplo:**

```tsx
<Button variant='primary' size='md' leftIcon={<Icon />}>
  Click me
</Button>
```

---

### Input

**Estados:**

- `default` - Normal
- `error` - Con error
- `success` - Validado
- `warning` - Advertencia

**Tamaños:**

- `sm` - Pequeño
- `md` - Mediano (default)
- `lg` - Grande

**Props adicionales:**

- `label` - Etiqueta del input
- `helperText` - Texto de ayuda
- `error` - Mensaje de error

**Ejemplo:**

```tsx
<Input
  label='Email'
  size='md'
  helperText='Ingresa tu correo'
  error='Email inválido'
/>
```

---

### Card

**Variantes:**

- `simple` - Sin decoración
- `shadow` - Con sombra (default)
- `bordered` - Solo borde
- `elevated` - Sombra pronunciada
- `outline` - Borde grueso transparente

**Props adicionales:**

- `title` - Título de la tarjeta
- `footer` - Contenido del pie
- `image` - URL de imagen superior
- `onClick` - Callback al hacer clic

**Ejemplo:**

```tsx
<Card
  variant='shadow'
  title='Card Title'
  image='/image.jpg'
  footer={<Button>Action</Button>}
>
  Content
</Card>
```

---

### Modal

**Tamaños:**

- `sm` - Pequeño (max-w-sm)
- `md` - Mediano (default, max-w-md)
- `lg` - Grande (max-w-2xl)
- `xl` - Extra grande (max-w-4xl)

**Props:**

- `isOpen` - Estado de apertura
- `onClose` - Callback al cerrar
- `title` - Título del modal
- `footer` - Contenido del pie

**Ejemplo:**

```tsx
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  size='md'
  title='Modal Title'
  footer={<Button>Close</Button>}
>
  Modal content
</Modal>
```

---

## 🚀 Sincronización de Tokens

Los tokens de `tailwind.config.ts` se sincronizan automáticamente con `globals.css` para Tailwind v4.

### Comando de sincronización:

```bash
npm run sync-tokens
```

### Flujo de trabajo:

1. Modifica tokens en `tailwind.config.ts`
2. Ejecuta `npm run sync-tokens`
3. Los cambios se aplican automáticamente en toda la app

---

## 📝 Buenas Prácticas

1. **Usa siempre los tokens** - No uses colores hardcoded
2. **Mantén consistencia** - Usa las variantes predefinidas
3. **Sincroniza después de cambios** - Ejecuta `sync-tokens`
4. **Documenta cambios** - Actualiza este archivo al agregar nuevos tokens
5. **Testing** - Prueba todas las variantes después de cambios

---

## 🔄 Actualizaciones

Para agregar un nuevo token:

1. Edita `tailwind.config.ts`

```typescript
const designTokens = {
  colors: {
    newColor: '#HEX',
  },
};
```

2. Ejecuta sincronización

```bash
npm run sync-tokens
```

3. Usa en componentes

```tsx
className = 'bg-newColor';
```

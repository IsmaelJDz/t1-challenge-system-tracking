# Sincronización de Design Tokens

## 📋 Descripción

Este proyecto usa **[tailwind.config.ts](tailwind.config.ts) como única fuente de verdad** para los design tokens (colores, border radius, etc.).

Para Tailwind CSS v4, los colores deben estar definidos como custom properties CSS en `globals.css`. El script de sincronización automatiza este proceso.

## 🚀 Uso

### Modificar colores o tokens

1. Edita los valores en `tailwind.config.ts` en el objeto `designTokens`:

```typescript
const designTokens = {
  colors: {
    primary: '#2563EB', // Modifica aquí
    'primary-hover': '#1D4ED8',
    // ...
  },
  borderRadius: {
    DEFAULT: '0.375rem', // Modifica aquí
    // ...
  },
};
```

2. Ejecuta el script de sincronización:

```bash
npm run sync-tokens
```

3. Los cambios se aplicarán automáticamente en `src/app/globals.css`

## ⚙️ Cómo funciona

1. **Fuente de verdad**: `tailwind.config.ts` → objeto `designTokens`
2. **Script**: `scripts/sync-tokens.ts` lee los tokens
3. **Destino**: Genera custom properties CSS en `src/app/globals.css`
4. **Resultado**: Las clases de Tailwind usan estos valores automáticamente

## 📝 Ejemplo

Si cambias el color primary en `tailwind.config.ts`:

```typescript
primary: '#FF0000',  // Nuevo color rojo
```

Ejecutas:

```bash
npm run sync-tokens
```

Y automáticamente se actualiza en `globals.css`:

```css
--color-primary: #ff0000;
```

Y todos los componentes que usan `bg-primary` mostrarán el nuevo color.

## ⚡ Ventajas

- ✅ Una sola fuente de verdad
- ✅ Sincronización automática
- ✅ Sin duplicación de código
- ✅ Type-safe (TypeScript en config)
- ✅ Compatible con Tailwind v4

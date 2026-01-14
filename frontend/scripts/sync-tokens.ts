#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tailwindConfigPath = path.join(__dirname, '../tailwind.config.ts');
const globalsPath = path.join(__dirname, '../src/app/globals.css');

const configContent = fs.readFileSync(tailwindConfigPath, 'utf-8');

const designTokensMatch = configContent.match(
  /const designTokens = ({[\s\S]*?});/
);

if (!designTokensMatch) {
  console.error('❌ No se pudo encontrar designTokens en tailwind.config.ts');
  process.exit(1);
}

const designTokens = eval(`(${designTokensMatch[1]})`);

console.log('✅ Design tokens encontrados:', Object.keys(designTokens));

function generateColorVars(colors: Record<string, string>): string {
  const vars: string[] = [];

  for (const [key, value] of Object.entries(colors)) {
    vars.push(`  --color-${key}: ${value};`);
  }

  return vars.join('\n');
}

// Generar las variables CSS desde borderRadius
function generateBorderRadiusVars(radii: Record<string, string>): string {
  const vars: string[] = [];

  for (const [key, value] of Object.entries(radii)) {
    const varName = key === 'DEFAULT' ? '--radius' : `--radius-${key}`;
    vars.push(`  ${varName}: ${value};`);
  }

  return vars.join('\n');
}

// Leer el archivo globals.css actual
const globalsContent = fs.readFileSync(globalsPath, 'utf-8');

// Construir las nuevas variables CSS
let cssVars = '';

if (designTokens.colors) {
  cssVars +=
    '\n  /* Design Tokens - Colores (Auto-generado desde tailwind.config.ts) */\n';
  cssVars += generateColorVars(designTokens.colors);
}

if (designTokens.borderRadius) {
  cssVars +=
    '\n\n  /* Design Tokens - Border Radius (Auto-generado desde tailwind.config.ts) */\n';
  cssVars += generateBorderRadiusVars(designTokens.borderRadius);
}

// Reemplazar el contenido entre los comentarios de auto-generación
// o insertar después de las variables existentes
const startMarker =
  '  /* Design Tokens - Colores (Auto-generado desde tailwind.config.ts) */';
const endOfThemeBlock = '}';

// Buscar el bloque @theme inline
const themeBlockMatch = globalsContent.match(/@theme inline \{([\s\S]*?)\n\}/);

if (!themeBlockMatch) {
  console.error(
    '❌ No se pudo encontrar el bloque @theme inline en globals.css'
  );
  process.exit(1);
}

// Obtener el contenido actual del bloque @theme
let themeContent = themeBlockMatch[1];

// Eliminar las variables de design tokens existentes si las hay
themeContent = themeContent.replace(
  /\n  \/\* Design Tokens[\s\S]*?(?=\n}|$)/,
  ''
);

// Agregar las nuevas variables al final
themeContent += cssVars;

// Reconstruir el archivo completo
const newGlobalsContent = globalsContent.replace(
  /@theme inline \{[\s\S]*?\n\}/,
  `@theme inline {${themeContent}\n}`
);

// Escribir el archivo actualizado
fs.writeFileSync(globalsPath, newGlobalsContent, 'utf-8');

console.log('✅ Tokens sincronizados exitosamente en globals.css');
console.log(
  `   - ${Object.keys(designTokens.colors || {}).length} colores sincronizados`
);
console.log(
  `   - ${
    Object.keys(designTokens.borderRadius || {}).length
  } valores de borderRadius sincronizados`
);

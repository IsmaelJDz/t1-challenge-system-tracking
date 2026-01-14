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

function generateColorVars(colors: Record<string, string>): string {
  const vars: string[] = [];

  for (const [key, value] of Object.entries(colors)) {
    vars.push(`  --color-${key}: ${value};`);
  }

  return vars.join('\n');
}

function generateBorderRadiusVars(radii: Record<string, string>): string {
  const vars: string[] = [];

  for (const [key, value] of Object.entries(radii)) {
    const varName = key === 'DEFAULT' ? '--radius' : `--radius-${key}`;
    vars.push(`  ${varName}: ${value};`);
  }

  return vars.join('\n');
}

const globalsContent = fs.readFileSync(globalsPath, 'utf-8');

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

const startMarker =
  '  /* Design Tokens - Colores (Auto-generado desde tailwind.config.ts) */';
const endOfThemeBlock = '}';

const themeBlockMatch = globalsContent.match(/@theme inline \{([\s\S]*?)\n\}/);

if (!themeBlockMatch) {
  console.error(
    '❌ No se pudo encontrar el bloque @theme inline en globals.css'
  );
  process.exit(1);
}

let themeContent = themeBlockMatch[1];

themeContent = themeContent.replace(
  /\n  \/\* Design Tokens[\s\S]*?(?=\n}|$)/,
  ''
);

themeContent += cssVars;

const newGlobalsContent = globalsContent.replace(
  /@theme inline \{[\s\S]*?\n\}/,
  `@theme inline {${themeContent}\n}`
);

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

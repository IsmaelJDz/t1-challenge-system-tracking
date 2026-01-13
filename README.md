# T1 Component Library & Analytics System

Sistema integral que consta de una librería de componentes React reutilizables con seguimiento automático de interacciones (analytics) y un backend dedicado para la recolección y exportación de datos.

Proyecto desarrollado como parte del Examen Técnico T1.

## 🚀 Tecnologías

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS (Design Tokens configurados)
- **Testing:** Jest + React Testing Library (Coverage > 80%)
- **Iconos:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **Base de Datos:** MongoDB Atlas + Mongoose
- **Autenticación:** JWT (JSON Web Tokens)
- **Seguridad:** Bcryptjs (Hashing de contraseñas), CORS

---

## 🛠️ Instalación y Ejecución

El proyecto es un Monorepo. Sigue estos pasos para iniciarlo completamente.

### Prerrequisitos
- Node.js (v18.11.0 o superior)
- npm o yarn
- Cuenta en MongoDB Atlas

### 1. Configuración del Backend

```bash
cd backend
npm install
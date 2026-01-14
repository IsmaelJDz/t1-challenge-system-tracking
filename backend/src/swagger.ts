import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Application } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'T1 Component Library API',
      version: '1.0.0',
      description:
        'API REST para el sistema de tracking de componentes y autenticación de usuarios. Incluye endpoints para registro, login, tracking de interacciones y exportación de datos.',
      contact: {
        name: 'T1 Team',
        email: 'soporte@t1.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://api-production.com',
        description: 'Servidor de producción',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Token JWT obtenido desde /api/auth/login o /api/auth/register',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del usuario',
              example: '507f1f77bcf86cd799439011',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'usuario@ejemplo.com',
            },
            token: {
              type: 'string',
              description: 'Token JWT para autenticación',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
        TrackingEvent: {
          type: 'object',
          required: ['component', 'action'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del evento',
              example: '507f1f77bcf86cd799439011',
            },
            component: {
              type: 'string',
              description: 'Nombre del componente',
              example: 'Button',
              enum: ['Button', 'Input', 'Card', 'Modal'],
            },
            variant: {
              type: 'string',
              description: 'Variante del componente',
              example: 'primary',
            },
            action: {
              type: 'string',
              description: 'Acción realizada',
              example: 'click',
            },
            metadata: {
              type: 'object',
              description: 'Datos adicionales del evento',
              example: { name: 'submit-button', page: '/dashboard' },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
              example: '2026-01-14T10:30:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de actualización',
              example: '2026-01-14T10:30:00.000Z',
            },
          },
        },
        Stats: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Nombre del componente',
              example: 'Button',
            },
            count: {
              type: 'number',
              description: 'Número total de interacciones',
              example: 145,
            },
            actions: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Lista de todas las acciones registradas',
              example: ['click', 'click', 'click'],
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error',
              example: 'Error al procesar la solicitud',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Health',
        description: 'Endpoints de salud del servidor',
      },
      {
        name: 'Authentication',
        description: 'Endpoints de autenticación de usuarios',
      },
      {
        name: 'Tracking',
        description: 'Endpoints de tracking de interacciones',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: 'T1 API Documentation',
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    '📚 Swagger docs disponible en http://localhost:5000/api-docs'
  );
};

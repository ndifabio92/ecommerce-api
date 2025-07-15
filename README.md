# 🛍️ E-commerce API

API de e-commerce desarrollada con Node.js, Express, TypeScript y MongoDB, siguiendo los principios de **Arquitectura Hexagonal con Vertical Slicing**.

## 🚀 Características Implementadas

### ✅ **Productos con Paginación Avanzada**

- **Filtros**: Búsqueda por título, descripción y categoría
- **Ordenamiento**: Ascendente/descendente por precio
- **Paginación**: Control de límite y página
- **Respuesta estructurada**: Con información de navegación

### ✅ **Gestión Completa de Carritos**

- Crear carrito
- Agregar productos al carrito
- Eliminar productos del carrito
- Actualizar cantidades
- Vaciar carrito
- Eliminar carrito completo
- **Populate**: Los productos se muestran completos con toda su información

### ✅ **Vistas Web Interactivas**

- **Home**: Lista de productos con paginación y filtros
- **Detalle de Producto**: Vista completa con información detallada
- **Carrito**: Gestión visual del carrito con productos populados
- **RealTime Products**: Gestión en tiempo real con Socket.IO

## 📋 Endpoints API

### Productos

```
GET    /api/v1/products                    # Listar productos con paginación
GET    /api/v1/products/:id                # Obtener producto por ID
POST   /api/v1/products                    # Crear producto
PUT    /api/v1/products/:id                # Actualizar producto
DELETE /api/v1/products/:id                # Eliminar producto
```

### Carritos

```
GET    /api/v1/cart/:id                    # Obtener carrito por ID
POST   /api/v1/cart                        # Crear carrito
POST   /api/v1/cart/:id/products/:pid/:qty # Agregar producto al carrito
DELETE /api/v1/cart/:id/products/:pid      # Eliminar producto del carrito
PUT    /api/v1/cart/:id                    # Actualizar todos los productos
PUT    /api/v1/cart/:id/products/:pid      # Actualizar cantidad de producto
DELETE /api/v1/cart/:id/clear              # Vaciar carrito
DELETE /api/v1/cart/:id                    # Eliminar carrito
```

### Vistas Web

```
GET    /                                   # Home con productos y paginación
GET    /products/:pid                      # Detalle de producto
GET    /carts/:cid                         # Vista del carrito
GET    /realtimeproducts                   # Gestión en tiempo real
```

## 🔧 Parámetros de Consulta (Query Params)

### Productos con Filtros

```
GET /api/v1/products?limit=10&page=1&sort=asc&query=electronics
```

- `limit` (opcional): Número de elementos por página (default: 10)
- `page` (opcional): Número de página (default: 1)
- `sort` (opcional): Ordenamiento por precio ("asc" | "desc")
- `query` (opcional): Búsqueda en título, descripción y categoría

### Respuesta de Paginación

```json
{
  "status": "success",
  "payload": [...],
  "totalPages": 5,
  "prevPage": 1,
  "nextPage": 3,
  "page": 2,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevLink": "/api/v1/products?page=1&limit=10",
  "nextLink": "/api/v1/products?page=3&limit=10"
}
```

## 🏗️ Arquitectura del Proyecto

### Arquitectura Hexagonal con Vertical Slicing

Este proyecto implementa **Arquitectura Hexagonal (Ports & Adapters)** combinada con **Vertical Slicing**:

#### 🔷 **Arquitectura Hexagonal**

- **Domain**: Lógica de negocio pura (entidades, interfaces de repositorios)
- **Application**: Casos de uso y DTOs (orquestación de la lógica de negocio)
- **Infrastructure**: Adaptadores externos (controllers, repositories, models)

#### 📊 **Vertical Slicing**

- Cada **feature** (products, cart, home) es un slice vertical completo
- Cada slice contiene todas las capas necesarias (domain → application → infrastructure)
- Permite desarrollo independiente y mantenimiento modular

```
src/
├── features/ ← Vertical Slices por dominio
│   ├── products/ ← Slice completo de productos
│   │   ├── application/ ← Casos de uso y DTOs
│   │   │   ├── dtos/
│   │   │   └── use-cases/
│   │   ├── domain/ ← Lógica de negocio pura
│   │   │   ├── entities/
│   │   │   └── repositories/
│   │   └── infrastructure/ ← Adaptadores externos
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── repositories/
│   │       └── routes/
│   ├── cart/ ← Slice completo de carrito
│   │   ├── application/
│   │   │   ├── dtos/
│   │   │   └── use-cases/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── repositories/
│   │   └── infrastructure/
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── repositories/
│   │       └── routes/
│   └── home/ ← Slice de presentación
│       └── infrastructure/
│           ├── controllers/
│           └── routes/
├── shared/ ← Código compartido entre slices
│   ├── application/
│   │   └── dtos/
│   ├── config/
│   └── infrastructure/
│       ├── database/
│       ├── middleware/
│       ├── routes/
│       ├── static/
│       ├── templates/
│       └── utils/
└── index.ts
```

#### ✅ **Beneficios de esta Arquitectura**

- **Mantenibilidad**: Cada feature es independiente
- **Testabilidad**: Lógica de negocio aislada de infraestructura
- **Escalabilidad**: Fácil agregar nuevas features
- **Flexibilidad**: Cambiar implementaciones sin afectar el dominio

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express, TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Arquitectura**: Hexagonal Architecture con Vertical Slicing
- **Templates**: Handlebars
- **Tiempo Real**: Socket.IO
- **Validación**: TypeScript interfaces
- **Paginación**: Implementación personalizada

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (v16 o superior)
- MongoDB
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd ecommerce-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.template .env
# Editar .env con tus configuraciones

# Compilar TypeScript
npm run build

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

### Variables de Entorno

```env
DEVELOPMENT=true
CORS_ORIGIN=http://localhost:3000,http://example.com
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=8080
```

## 🔍 Ejemplos de Uso

### Crear un carrito y agregar productos

```bash
# 1. Crear carrito
curl -X POST http://localhost:8080/api/v1/cart

# 2. Agregar producto al carrito
curl -X POST http://localhost:8080/api/v1/cart/[cart-id]/products/[product-id]/2

# 3. Ver carrito con productos populados
curl -X GET http://localhost:8080/api/v1/cart/[cart-id]
```

### Filtrar y paginar productos

```bash
# Buscar productos de electrónica, ordenados por precio ascendente
curl -X GET "http://localhost:8080/api/v1/products?query=electronics&sort=asc&limit=5&page=1"
```

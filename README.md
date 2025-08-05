# 🛍️ E-commerce API

API de e-commerce desarrollada con Node.js, Express, TypeScript y MongoDB, siguiendo los principios de **Arquitectura Hexagonal con Vertical Slicing**.

## 🚀 Características Implementadas

### ✅ **Sistema de Autenticación y Autorización JWT**

- **CRUD Completo de Usuarios**: Crear, leer, actualizar y eliminar usuarios
- **Autenticación JWT**: Login con email y contraseña
- **Encriptación de Contraseñas**: Usando bcrypt con hashSync
- **Estrategias de Passport**: JWT Strategy y estrategia "current"
- **Middleware de Autenticación**: Protección de rutas con tokens
- **Roles de Usuario**: USER y ADMIN
- **Validación de Tokens**: Endpoint `/api/v1/sessions/current`

### ✅ **Productos con Paginación Avanzada**

- **Filtros**: Búsqueda por título, descripción y categoría
- **Ordenamiento**: Ascendente/descendente por precio
- **Paginación**: Control de límite y página
- **Respuesta estructurada**: Con información de navegación

### ✅ **Gestión Completa de Carritos**

- Crear carrito (requiere autenticación con rol USER)
- **Asignación Automática**: El carrito se asigna automáticamente al usuario autenticado
- Agregar productos al carrito
- Eliminar productos del carrito
- Actualizar cantidades
- Vaciar carrito
- Eliminar carrito completo
- **Populate**: Los productos se muestran completos con toda su información
- **Seguridad**: Solo usuarios autenticados con rol USER pueden crear carritos
- **Relación User-Cart**: El campo `cart` del usuario se actualiza automáticamente
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
POST   /api/v1/cart                        # Crear carrito (requiere auth + rol USER)
POST   /api/v1/cart/:id/products/:pid/:qty # Agregar producto al carrito
DELETE /api/v1/cart/:id/products/:pid      # Eliminar producto del carrito
PUT    /api/v1/cart/:id                    # Actualizar todos los productos
PUT    /api/v1/cart/:id/products/:pid      # Actualizar cantidad de producto
DELETE /api/v1/cart/:id/clear              # Vaciar carrito
DELETE /api/v1/cart/:id                    # Eliminar carrito
```

### Autenticación

```
POST   /api/v1/sessions/login              # Login de usuario (email/password)
GET    /api/v1/sessions/current            # Obtener usuario actual (Passport JWT)
GET    /api/v1/sessions/current-direct     # Obtener usuario actual (ValidateTokenUseCase)
```

### Usuarios

```
GET    /api/v1/users                       # Listar todos los usuarios
GET    /api/v1/users/:id                   # Obtener usuario por ID
POST   /api/v1/users                       # Crear nuevo usuario
PUT    /api/v1/users/:id                   # Actualizar usuario
DELETE /api/v1/users/:id                   # Eliminar usuario
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
JWT_SECRET=tu-clave-secreta-jwt-muy-segura
PORT=8080
```

## 🔍 Ejemplos de Uso

### Sistema de Autenticación

```bash
# 1. Login de usuario (obtener token JWT)
curl -X POST http://localhost:8080/api/v1/sessions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ecommerce.com",
    "password": "admin123"
  }'

# 2. Obtener usuario actual (requiere token)
curl -X GET http://localhost:8080/api/v1/sessions/current \
  -H "Authorization: Bearer [tu-token-jwt]"
```

### CRUD de Usuarios

```bash
# 1. Crear nuevo usuario
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@example.com",
    "age": 28,
    "password": "password123",
    "role": "user"
  }'

# 2. Obtener todos los usuarios
curl -X GET http://localhost:8080/api/v1/users

# 3. Obtener usuario por ID
curl -X GET http://localhost:8080/api/v1/users/[user-id]

# 4. Actualizar usuario
curl -X PUT http://localhost:8080/api/v1/users/[user-id] \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Juan Carlos",
    "age": 29
  }'

# 5. Eliminar usuario
curl -X DELETE http://localhost:8080/api/v1/users/[user-id]
```

### Crear un carrito y agregar productos

```bash
# 1. Primero hacer login para obtener el token
curl -X POST http://localhost:8080/api/v1/sessions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@ecommerce.com",
    "password": "user123"
  }'

# 2. Crear carrito (requiere token de usuario con rol USER)
# El carrito se asigna automáticamente al usuario autenticado
curl -X POST http://localhost:8080/api/v1/cart \
  -H "Authorization: Bearer [tu-token-jwt]"

# 3. Agregar producto al carrito
curl -X POST http://localhost:8080/api/v1/cart/[cart-id]/products/[product-id]/2

# 4. Ver carrito con productos populados
curl -X GET http://localhost:8080/api/v1/cart/[cart-id]

# 5. Verificar que el usuario ahora tiene el cart asignado
curl -X GET http://localhost:8080/api/v1/sessions/current \
  -H "Authorization: Bearer [tu-token-jwt]"
```

### Flujo Completo: Usuario → Cart → Usuario Actualizado

```bash
# 1. Login inicial - usuario sin cart
curl -X POST http://localhost:8080/api/v1/sessions/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@ecommerce.com", "password": "user123"}'
# Respuesta: user.cart = null

# 2. Crear carrito con token del usuario
curl -X POST http://localhost:8080/api/v1/cart \
  -H "Authorization: Bearer [token]"
# El cart se crea y se asigna al usuario automáticamente

# 3. Verificar usuario actualizado
curl -X GET http://localhost:8080/api/v1/sessions/current \
  -H "Authorization: Bearer [token]"
# Respuesta: user.cart = { "id": "cart-id", "products": [...] }
```

### Filtrar y paginar productos

```bash
# Buscar productos de electrónica, ordenados por precio ascendente
curl -X GET "http://localhost:8080/api/v1/products?query=electronics&sort=asc&limit=5&page=1"
```

### Usuarios por Defecto

Al iniciar el servidor, se crean automáticamente:

- **Administrador**:

  - Email: `admin@ecommerce.com`
  - Password: `admin123`
  - Role: `admin`

- **Usuario Normal**:
  - Email: `user@ecommerce.com`
  - Password: `user123`
  - Role: `user`

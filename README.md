# API de Carritos - Documentación

Esta API permite gestionar carritos de compras mediante un sistema de archivos JSON.

## Env
```
PORT=8080
DEVELOPMENT=true
CORS_ORIGIN=http://localhost:3000,http://example.com
```
---

## Comando

```
npm run dev
```

---

## Base URL
```
http://localhost:8080/api/v1/
```

## Endpoints

### Productos

### 1. Crear un nuevo producto

**Endpoint:** `POST /`

**URL completa:** `http://localhost:8080/api/v1/products/`

### 2. Obtener productos

**Endpoint:** `GET /`

**URL completa:** `http://localhost:8080/api/v1/products/`

### 3. Obtener un producto

**Endpoint:** `GET /:id`

**URL completa:** `http://localhost:8080/api/v1/products/{id}`

### 4. Modificar un producto

**Endpoint:** `PUT /:id`

**URL completa:** `http://localhost:8080/api/v1/products/{id}`

### 5. Eliminar un producto

**Endpoint:** `DELETE /:id`

**URL completa:** `http://localhost:8080/api/v1/products/{id}`



### Carrito De Compra

### 1. Crear un nuevo carrito

**Endpoint:** `POST /`

**URL completa:** `http://localhost:8080/api/v1/carts/`

### 2. Obtener productos de un carrito

**Endpoint:** `GET /:cid`

**URL completa:** `http://localhost:8080/api/v1/carts/{cid}`


### 3. Agregar producto al carrito

**Endpoint:** `POST /:cid/product/:pid`

**URL completa:** `http://localhost:8080/api/v1/carts/{cid}/product/{pid}`

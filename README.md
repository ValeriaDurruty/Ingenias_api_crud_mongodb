# 🌐 Desarrollo de API RESTful utilizando MongoDB

Esta API permite gestionar productos de un supermercado utilizando una base de datos MongoDB. Ofrece endpoints para realizar operaciones CRUD (crear, leer, actualizar y eliminar productos).
Desarrollado con **Express.js** y **MongoDB**.

---

## 📋 Sumario

- [🌐 Desarrollo de API RESTful utilizando MongoDB](#-desarrollo-de-api-restful-utilizando-mongodb)
  - [📋 Sumario](#-sumario)
  - [🌍 URL base](#-url-base)
  - [📦 Principales funcionalidades](#-principales-funcionalidades)
  - [🛠️ Configuración del proyecto](#️-configuración-del-proyecto)
  - [📁 Ejemplo `.env`](#-ejemplo-env)
  - [🔗 Endpoints](#-endpoints)
  - [💡 Ejemplos de uso](#-ejemplos-de-uso)
    - [🔍 GET `/productos`](#-get-productos)
    - [➕ POST `/productos`](#-post-productos)
    - [📝 PUT `/productos/:codigo`](#-put-productoscodigo)
    - [🗑️ DELETE `/productos/:id`](#️-delete-productosid)
  - [🗺️ Diagrama de flujo API RESTful](#️-diagrama-de-flujo-api-restful)
  - [✨👩‍💻 Integrantes del grupo](#-integrantes-del-grupo)

---

## 🌍 URL base

La URL base para hacer las peticiones a la API es:

```
http://localhost:3006
```

---

## 📦 Principales funcionalidades

- **API RESTful**: Permite la interacción mediante operaciones CRUD con la base de datos `supermercado`, utilizando endpoints bien definidos.

- **Gestión de Base de Datos**: Integración con bases de datos no relacionales para el almacenamiento de productos.

- **Validación y Manejo de Errores**: Verificaciones básicas de datos y mensajes adecuados de error.

---

## 🛠️ Configuración del proyecto

Para ejecutar el proyecto localmente:

1. Cloná este repositorio:
   ```bash
   git clone https://github.com/ValeriaDurruty/Ingenias_api_crud_mongodb.git
   ```
2. Instalá las dependencias:
   ```bash
   npm install
   ```
3. Creá un archivo `.env` en la raíz del proyecto con los siguientes datos:

---

## 📁 Ejemplo `.env`

```env
PORT=3006
MONGODB_URLSTRING=mongodb+srv://jobsemarr:supermercado@supermercado.e2pucdi.mongodb.net/?retryWrites=true&w=majority&appName=supermercado
```

---

## 🔗 Endpoints

| Método | Ruta               | Descripción                      |
| ------ | ------------------ | -------------------------------- |
| GET    | /productos         | Lista todos los productos        |
| GET    | /productos/:nombre | Busca producto por nombre        |
| POST   | /productos         | Agrega un nuevo producto         |
| PUT    | /productos/:codigo | Actualiza un producto por código |
| DELETE | /productos/:id     | Elimina un producto por id       |

---

## 💡 Ejemplos de uso

### 🔍 GET `/productos`

**Request:**

```
GET http://localhost:3006/productos
```

**Parámetros**: No requiere.

**Respuesta:**

- `200 OK`: Lista de productos.
- `500 Internal Server Error`: Error al conectarse a la base de datos.

```json
[
  {
    "_id": "684217f5a9bd0848b715f400",
    "codigo": 2456,
    "nombre": "Café",
    "precio": 9.99,
    "categoria": "Infusiones"
  },
  ...
]
```

---

```
GET http://localhost:3006/productos/:nombre
```

**Parámetros**: `nombre` (Nombre) — nombre del producto buscado.

**Respuesta:**

- `200 OK`: Búsqueda exitosa.
- `500 Internal Server Error`: Error al conectarse a la base de datos.

```json
[
  {
    "_id": "684217f5a9bd0848b715f400",
    "codigo": 2456,
    "nombre": "Café",
    "precio": 9.99,
    "categoria": "Infusiones"
  },
  ...
]
```

---

### ➕ POST `/productos`

**Request:**

```
POST http://localhost:3006/productos
```

**Parámetros**: No requiere.

**Body (JSON) obligatorio:**

| Campo       | Tipo   | Descripción            | Requerido |
| ----------- | ------ | ---------------------- | --------- |
| `codigo`    | Número | Código del producto    | Sí        |
| `nombre`    | String | Nombre del producto    | Sí        |
| `precio`    | Número | Precio unitario        | Sí        |
| `categoria` | String | Categoría del producto | Sí        |

```json
{
  "codigo": 8597,
  "nombre": "Papas Fritas",
  "precio": 22,
  "categoria": "Comestible"
}
```

**Respuesta:**

- `201 Created`: Producto creado exitosamente.
- `400 Bad Request`: Datos inválidos o incompletos.
- `500 Internal Server Error`: Error al guardar el producto.

```json
{
  "_id": "68422abc1234def56789gh01",
  "codigo": 8597,
  "nombre": "Papas Fritas",
  "precio": 22,
  "categoria": "Comestible"
}
```

---

### 📝 PUT `/productos/:codigo`

**Request:**

```
PUT http://localhost:3006/productos/1234
```

**Parámetros**: `codigo` (Número) — código del producto a modificar.
Nota: el codigo no puede ser modificado mediante esta ruta.

**Body (JSON):** campos a actualizar (al menos uno).

| Campo       | Tipo   | Descripción               | Requerido |
| ----------- | ------ | ------------------------- | --------- |
| `nombre`    | String | Nuevo nombre del producto | No        |
| `precio`    | Número | Nuevo precio              | No        |
| `categoria` | String | Nueva categoría           | No        |

```json
{
  "nombre": "Arroz Integral",
  "precio": 6.5,
  "categoria": "Comestible"
}
```

**Respuesta:**

- `200 OK`: Producto actualizado correctamente.
- `400 Bad Request`: Código mal formado o datos inválidos.
- `404 Not Found`: Producto con ese código no encontrado.
- `500 Internal Server Error`: Error al actualizar.

```json
{
  "_id": "684217f5a9bd0848b715f3fd",
  "codigo": 1234,
  "nombre": "Arroz Integral",
  "precio": 6.5,
  "categoria": "Comestible"
}
```

---

### 🗑️ DELETE `/productos/:id`

**Request:**

```
DELETE http://localhost:3006/productos/684217f5a9bd0848b715f402
```

**Parámetros**: `id` (string) — _ObjectId_ de MongoDB del producto a eliminar.

**Respuesta:**

- `204 No Content`: Producto eliminado exitosamente.
- `400 Bad Request`: ID inválido o mal formateado.
- `404 Not Found`: No se encontró el producto con ese ID.
- `500 Internal Server Error`: Error al intentar eliminar.

---

## 🗺️ Diagrama de flujo API RESTful

![Diagrama de flujo de API](./src/img/Diagrama%20de%20flujo%20API%20RESTful.png)

---

## ✨👩‍💻 Integrantes del grupo

        • Mariana Jobse
        • Valeria Durruty
        • Miriam Cabrera

Somos el **Grupo 4**, comprometidas con un trabajo colaborativo y de alta calidad.

---

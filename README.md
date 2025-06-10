# 🌐 Desarrollo de API RESTful utilizando MongoDB

Esta API permite gestionar productos de un supermercado utilizando una base de datos MongoDB. Ofrece endpoints para realizar operaciones CRUD (crear, leer, actualizar y eliminar productos).
Desarrollado con **Express.js** y **MongoDB**.

---

## 📋 Sumario

- [📦 Principales funcionalidades](#-principales-funcionalidades)
- [🛠️ Configuración del proyecto](#️-configuración-del-proyecto)
- [📁 Ejemplo `.env`](#-ejemplo-env)
- [🔗 Endpoints](#-endpoints)
- [💡 Ejemplos de uso](#-ejemplos-de-uso)
- [🗺️ Diagrama de flujo API RESTful](#-diagrama-de-flujo-api-restful)
- [✨👩‍💻 Integrantes del grupo](#-integrantes-del-grupo)

---

## 🌍 URL base

La URL base para hacer las peticiones a la API es:
```
http://localhost:3006
```

---

## 📦 Principales funcionalidades:

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
| ------ | ------------------ | ------------------------------   |
| GET    | /productos         | Lista todos los productos        |
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

---

### ➕ POST `/productos`

**Request:**
```
POST http://localhost:3006/productos
```

**Body:**

```json
{
  "codigo": 1234,
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

**Body:**

```json
{
  "nombre": "Arroz Integral",
  "precio": 6.50,
  "categoria": "Comestible"
}
```

---

### 🗑️ DELETE `/productos/:id`

**Request:**
```
DELETE http://localhost:3006/productos/684217f5a9bd0848b715f402
```

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
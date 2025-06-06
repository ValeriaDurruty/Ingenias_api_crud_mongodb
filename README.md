# 🌐 Desarrollo de API RESTful utilizando MongoDB

## 📋 Sumario

- [🌐 Desarrollo de API RESTful utilizando MongoDB](#-desarrollo-de-api-restful-utilizando-mongodb)
  - [📋 Sumario](#-sumario)
    - [Integrantes del proyecto](#integrantes-del-proyecto)
  - [📦 Introducción](#-introducción)
  - [🛠️ Configuración](#️-configuración)
  - [📁 Ejemplo `.env`](#-ejemplo-env)
  - [🔗 Endpoints](#-endpoints)
  - [Ejemplos de uso de los métodos HTTP](#ejemplos-de-uso-de-los-métodos-http)
    - [📥 GET /productos](#-get-productos)
    - [➕ POST /productos](#-post-productos)
    - [🗑️ DELETE /productos/:codigo](#️-delete-productoscodigo)
  - [✨💻💡 Integrantes del Grupo](#-integrantes-del-grupo)

### Integrantes del proyecto

- [✨💻💡Integrantes del Grupo](#integrantes-del-grupo)

---

## 📦 Introducción

• API RESTful:
Permite la interacción mediante operaciones CRUD con los contenidos de la base de datos "Supermercado", utilizando endpoints bien definidos.

• Gestión de Base de Datos:
Integración con bases de datos no relacionales para cubrir diversos requerimientos de almacenamiento.

La URL base es:

```
http://localhost:3006
```

---

## 🛠️ Configuración

Para ejecutar el proyecto localmente:

1. Cloná este repositorio `git clone https://github.com/ValeriaDurruty/Ingenias_api_crud_mongodb.git`
2. Instalá las dependencias con `npm install`
3. Definí el archivo `.env` con los siguientes datos:

---

## 📁 Ejemplo `.env`

```env
PORT=3006
MONGODB_URLSTRING=mongodb+srv://jobsemarr:supermercado@supermercado.e2pucdi.mongodb.net/?retryWrites=true&w=majority&appName=supermercado
```

---

## 🔗 Endpoints

| Método | Ruta               | Descripción                    |
| ------ | ------------------ | ------------------------------ |
| GET    | /productos         | Lista todos los productos      |
| POST   | /productos         | Agrega un nuevo producto       |
| DELETE | /productos/:codigo | Elimina un producto por código |

---

## Ejemplos de uso de los métodos HTTP

### 📥 GET /productos

```
http://localhost:3006/productos
```

### ➕ POST /productos

    http://localhost:3006/productos

```javascript
 {
    "codigo": 1,
    "nombre": "Papas Fritas",
    "precio": 2,
    "categoria": "Comestible"
}
```

### 🗑️ DELETE /productos/:codigo

    http://localhost:3006/productos/1234

---

## ✨💻💡 Integrantes del Grupo

        • Mariana Jobse

        • Valeria Durruty

        • Miriam Cabrera

Somos el Grupo 4, comprometidas con un trabajo colaborativo y de alta calidad.

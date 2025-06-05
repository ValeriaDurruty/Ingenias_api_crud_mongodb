const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectToMongoDB, disconnectToMongoDB } = require("./mongoDB");
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3006;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Content-type", "application/json; charset=utf-8");
  next();
});

//http://localhost:3006
app.get("/", (req, res) => {
  res.status(200).send("Bienvenidos a la API de Supermercado RESTful");
});

//http://localhost:3006/productos
app.get("/productos", async (req, res) => {
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).send("Error al conectarse a MongoDB");
    return;
  }
  const db = client.db("supermercado");
  const productos = await db.collection("supermercado").find().toArray();
  res.json(productos);
  await disconnectToMongoDB();
});

// Agregar producto
app.post('/productos', async (req, res) => {
    const nuevoProducto = req.body;

    if (nuevoProducto === undefined) {
        res.status(400).send('Error en el formato de los datos del producto');
        return;
    }
    
    // Validar los campos requeridos
    if (!nuevoProducto.codigo || !nuevoProducto.nombre || nuevoProducto.precio === undefined || !nuevoProducto.categoria) {
        res.status(400).send('Faltan campos requeridos: código, nombre, precio o categoría');
        return;
    } else {
        // Validar que nombre sea string
        if (typeof nuevoProducto.nombre !== 'string') {
            res.status(400).send('El campo nombre debe ser un string');
            return;
        }
        // validar que precio sea mayor que cero
        if (nuevoProducto.precio <= 0) {
            res.status(400).send('El campo precio debe ser mayores a cero');
            return;
        }
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB');
        return;
    }

    const collection = client.db('supermercado').collection('supermercado');
    
    await collection.insertOne(nuevoProducto)
    .then(() => {
        console.log('Nuevo producto creado correctamente');
        res.status(201).send(nuevoProducto);
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Error al agregar producto');
    })
    .finally(() => {
        disconnectToMongoDB();
    });
})

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
    const productoId = req.params.id;

    if (!productoId) {
        return res.status(400).send('El formato de datos es erróneo o inválido.');
    }

    const client = await connectToMongoDB();
    if (!client) {
        return res.status(500).send('Error al conectarse a MongoDB');
    }

    try {
        const collection = client.db('supermercado').collection('supermercado');
        const result = await collection.deleteOne({ _id: new ObjectId(productoId) });

        if (result.deletedCount === 0) {
            return res.status(404).send(`No se encontró el producto con el ID proporcionado: ${productoId}`);
        }

        console.log('Producto eliminado correctamente');
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Se produjo un error al intentar eliminar el producto');
    } finally {
        disconnectToMongoDB();
    }
})

app.use((req, res) => {
  // para manejar rutas inexistentes
  res.status(404).send("Lo siento, la página buscada no existe");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

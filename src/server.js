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
    const nuevoProducto = {
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: req.body.precio,
        categoria: req.body.categoria
    };

    if (nuevoProducto === undefined) {
        res.status(400).send('Error en el formato de los datos del producto');
        return;
    }

    // Validar los campos requeridos
    if (!nuevoProducto.codigo || !nuevoProducto.nombre || nuevoProducto.precio === undefined || !nuevoProducto.categoria) {
        res.status(400).send('Faltan campos requeridos: código, nombre, precio o categoría');
        return;
    } else {
        // Validar que nombre y categoría sea string
        if (typeof nuevoProducto.nombre !== 'string' || typeof nuevoProducto.categoria !== 'string') {
            res.status(400).send('Los campos nombre y categoría deben ser strings');
            return;
        }

        // validar que precio sea un número y mayor a cero
        if (typeof nuevoProducto.precio !== 'number' || isNaN(nuevoProducto.precio) || nuevoProducto.precio <= 0) {
          res.status(400).send('El campo precio debe ser un número mayor a cero');
          return;
        }

        // Validar que código sea un número
        if (typeof nuevoProducto.codigo !== 'number' || isNaN(nuevoProducto.codigo)) {
            res.status(400).send('El campo código debe ser un número');
            return;
        }
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB');
        return;
    }

    const collection = client.db('supermercado').collection('supermercado');

    try {
      // Verificar si el código ya existe
      const codigoExistente = await collection.findOne({ codigo: nuevoProducto.codigo });

      if (codigoExistente) {
        res.status(400).send(`El código ${nuevoProducto.codigo} ya existe. Por favor, utiliza un código diferente.`);
        return;
      }
      
      await collection.insertOne(nuevoProducto)
      console.log('Nuevo producto creado correctamente');
      res.status(201).send(nuevoProducto);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar producto');

    } finally {
        disconnectToMongoDB();

    };
});

//http://localhost:3006/productos/1234
// A partir del código, busca el producto y lo modifica.
// Modifica todos los campos menos _ID. No permite agregar campos nuevos
app.put("/productos/:codigo", async (req, res) => {
  const codigo_buscado = parseInt(req.params.codigo);
  if (typeof codigo_buscado !== "number" || isNaN(codigo_buscado)) {
    return res
      .status(404)
      .send("El código ingresado: " + req.params.codigo + ", es inválido");
  }

  const { codigo, nombre, precio, categoria } = req.body;

  if (
    codigo === undefined ||
    nombre === undefined ||
    precio === undefined ||
    categoria === undefined
  ) {
    return res.status(400).send("Faltan campos requeridos");
  }
  const client = await connectToMongoDB();
  if (!client) {
    res.status(500).send("Error al conectarse a MongoDB");
    return;
  }
  const collection = client.db("supermercado").collection("supermercado");
  // modificacion con control de operación
  await collection
    .updateOne(
      { codigo: codigo_buscado },
      { $set: { codigo, nombre, precio, categoria } }
    )
    .then(() => {
      console.log("Producto modificado: ");
      res.status(200).send();
      return;
    })
    .catch((error) => {
      res.status(500).json({
        descripcion: "Error al modificar el objeto con código :",
        codigo_buscado,
      });
      return;
    })
    .finally(() => {
      client.close();
    });
});

// Eliminar productoMore actions
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
                      res.status(404).send(`No se encontró el producto con el ID proporcionado: ${productoId}`);
        } else {
            console.log('Producto eliminado correctamente');
            res.status(204).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Se produjo un error al intentar eliminar el producto');
    } finally {
        disconnectToMongoDB();
    }
});

app.use((req, res) => {
  // para manejar rutas inexistentes
  res.status(404).send("Lo siento, la página buscada no existe");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
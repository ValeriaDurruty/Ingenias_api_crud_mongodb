const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectToMongoDB, disconnectToMongoDB } = require("./mongoDB");

const PORT = process.env.PORT || 3006;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Content-type", "application/json; charset=utf-8"); // tenia "," en "/json," --> error: {invalida media type}
  next();
});

//http://localhost:3006
app.get("/", (req, res) => {
  res.status(200).end("<h1> Bienvenidos a la API de frutas RESTful </h1>");
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
});

app.use((req, res) => {
  // para manejar rutas inexistentes
  res.status(404).send("Lo siento, la página buscada no existe");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

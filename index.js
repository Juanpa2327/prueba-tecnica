const express = require("express");
const app = express();
app.use(express.json());

// rutas de registro
const registerRoutes = require("./usuario/register");
const loginRoutes = require("./usuario/login");

app.use(registerRoutes);
app.use(loginRoutes);

//rutas producto

const productosRoutes = require("./productos/productos");


app.use(productosRoutes);



app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));

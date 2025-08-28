const express = require("express");
const app = express()
app.use(express.json());

// rutas de registro
const registerRoutes = require("./usuario/register");
const loginRoutes = require("./usuario/login");
app.use(registerRoutes);
app.use(loginRoutes);

//rutas producto
const productosRoutes = require("./productos/productos");
app.use(productosRoutes);

//rutas comrpas
const comprasRoutes = require("./compras/compras");
const HistorialRoutes = require("./compras/historial");
app.use(comprasRoutes);
app.use(HistorialRoutes);

//Ruta index

app.get("/", (req, res) => res.json({ 
    
    Mensaje: "Welcome"

}));

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));

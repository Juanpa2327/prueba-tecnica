const app = require("express");
const bcrypt = require("bcryptjs");
const router = app.Router();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

// Clave secreta
const JWT_SECRET = "mi_super_secreta_clave";

// Ruta para login
router.post("/login",async(req, res) => {

    try {
    const { usuario, password } = req.body;


    if (!usuario || !password) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }

    // consulta de usuario en la base de datos
    const user = await Usuario.findOne({ where: { usuario } });
    
    if (!user) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // generar token
    const token = jwt.sign(
      { id: user.id, username: user.usuario, role: user.rol }, 
      JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({message: "Login exitoso", token: token});

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  } 

});

module.exports = router;

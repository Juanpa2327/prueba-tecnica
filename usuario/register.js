const app = require("express");
const bcrypt = require("bcryptjs");
const db = require("../bbdd");  
const router = app.Router();
const Usuario = require("../models/user");


router.post("/register", async (req, res) => {

  try {
    const { nombre, usuario, password, rol } = req.body;

    if (!nombre || !usuario || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // encriptacion de la contraseña
    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      usuario,
      password: hash,
      rol,
    });

    res.status(201).json({ 
      message: "Usuario creado correctamente", 
      userId: result.insertId });

  } catch (error) {
    res.status(500).json({ error: "Error interno" });
  }
});

module.exports = router;
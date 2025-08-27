const app = require("express");
const bcrypt = require("bcryptjs");
const db = require("../bbdd");  
const router = app.Router();

// Ruta para registrar usuario
router.post("/register", async (req, res) => {

  try {
    const { nombre, usuario, password, rol } = req.body;

    // Validación rápida
    if (!nombre || !usuario || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(password, 10);

    // Insertar en la base de datos
    const sql = "INSERT INTO usuarios (nombre, usuario, password, rol) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, usuario, hash, rol], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al registrar usuario" });
      }
      res.status(201).json({ message: "Usuario registrado correctamente", userId: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno" });
  }
});

module.exports = router;
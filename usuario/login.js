const app = require("express");
const bcrypt = require("bcryptjs");
const connection = require("../bbdd"); 
const router = app.Router();

// Ruta para login
router.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  // Verificamos que no lleguen datos vacíos
  if (!usuario || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
  }

  // Consultamos al usuario en la base de datos
  connection.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error en el servidor", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const user = results[0];

    console.log(password);
    console.log(user.password);
    

    // Comparamos la contraseña ingresada con la guardada (encriptada)
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
  });
  res.status(200).json({message: "Login exitoso"});
});

module.exports = router;

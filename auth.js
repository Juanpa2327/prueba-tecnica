const jwt = require("jsonwebtoken");
const JWT_SECRET = "mi_super_secreta_clave";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(403).json({ error: "Token faltante" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });

    req.user = user; 
    next();
  });
}

module.exports = authMiddleware;
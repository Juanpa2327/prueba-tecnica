const app = require("express"); 
const router = app.Router();
const authMiddleware = require("../auth");
const Compra = require("../models/compras");
const DetalleCompra = require("../models/detalle_compra");
const Producto = require("../models/producto");

//ver productos
router.get("/historial", authMiddleware, async (req,     res) => {
  try {
    //requisito de rol
    if (req.user.role !== "administrador") {
      return res.status(403).json({ error: "Acceso denegado, solo administradores" });
    }

    const userId = req.user.id;

    // Traer las compras del usuario con los detalles y productos
    const historial = await Compra.findAll({
      where: { id_usuario: userId },
      include: [
        {
          model: DetalleCompra,
          include: [
            {
              model: Producto,
              attributes: ["num_lote", "nombre", "precio"], // Solo los campos que quieras
            },
          ],
        },
      ],
    });

    res.json({
      msg: "Historial de compras",
      userId,
      historial,
    });

    }catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ msg: "Error en el servidor", error });
    }
});


module.exports = router;
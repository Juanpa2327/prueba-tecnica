const app = require("express"); 
const router = app.Router();
const authMiddleware = require("../auth");
const Usuario = require("../models/user");
const DetalleCompra = require("../models/detalle_compra");
const Producto = require("../models/producto");
const Compra = require("../models/compras");

//ver productos
router.post("/buscador", authMiddleware, async (req, res) => {
  try {
    //requisito de rol
    if (req.user.role !== "administrador") {
      return res.status(403).json({ error: "Acceso denegado, solo administradores" });
    }

        const { idUsuario } = req.body;

    // buscar compras del usuario con sus detalles
    const compras = await Compra.findAll({
      where: { id_usuario: idUsuario },
      include: [
        {
          model: Usuario,
          attributes: ["id", "nombre"]
        },
        {
          model: DetalleCompra,
          attributes: ["cantidad", "precio_unitario"],
          include: [
            {
              model: Producto,
              attributes: ["num_lote", "nombre", "precio"]
            }
          ]
        }
      ],
      order: [["fecha_compra", "DESC"]]
    });

    if (!compras.length) {
      return res.status(404).json({ msg: "El usuario no tiene compras registradas" });
    }
    

    // armar la respuesta con el total
    const resultado = compras.map(compra => {
    const detalles = compra.detalle_compras || []; 

  const total = detalles.reduce(
    (acc, detalle) => acc + detalle.cantidad * detalle.precio_unitario,
    0
  );

  return {
    idCompra: compra.id,
    fecha: compra.fecha_compra,
    cliente: compra.Usuario?.nombre,
    productos: detalles.map(detalle => ({
      producto: detalle.Producto?.nombre,
      cantidad: detalle.cantidad,
      precioUnitario: detalle.precio_unitario
    })),
    totalCompra: total
  };
});

    res.status(200).json(resultado);

    }catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ msg: "Error en el servidor", error });
    }
});


module.exports = router;
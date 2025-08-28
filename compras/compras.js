const app = require("express"); 
const router = app.Router();
const authMiddleware = require("../auth");
const Producto = require("../models/producto");
const Compra = require("../models/compras");
const DetalleCompra = require("../models/detalle_compra");
const Usuario = require("../models/user");

router.post("/compras", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "cliente") {
      return res.status(403).json({ error: "Acceso denegado, compras habilitadas para clientes" });
    }
    

    const {productos } = req.body;

    let total = 0;
    const detalles = [];
    const id_usuario = req.user.id;

    // Verificar stock
    for (const item of productos) {
      const producto = await Producto.findByPk(item.id_producto);

      if (!producto) {
        return res.status(404).json({ error: `Producto con ID ${item.id_producto} no encontrado` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}` });
      }

      // Descontar stock
      producto.stock -= item.cantidad;
      await producto.save();

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      detalles.push({ num_lote: producto.num_lote, cantidad: item.cantidad, subtotal, precio_unitario: producto.precio});
    }

    // Guardar compra
    const compra = await Compra.create({
    id_usuario,
    total
    });

    // Guardar detalles
    for (const det of detalles) {
      await DetalleCompra.create({
        id_compra: compra.id,
        id_producto: det.num_lote,
        cantidad: det.cantidad,
        subtotal: det.subtotal,
        precio_unitario: det.precio_unitario
      });
    }
    // Recuperar factura con datos completos
    const factura = await Compra.findOne({
      where: { id: compra.id },
      include: [
        {
          model: Usuario,
          attributes: ["id", "usuario", "nombre"] // ajusta según columnas que tengas
        },
        {
          model: DetalleCompra,
          include: [
            {
              model: Producto,
              attributes: ["num_lote", "nombre", "precio"]
            }
          ]
        }
      ]
    });
    

    // Formatear respuesta tipo factura
const response = {
  id_compra: factura.id, // o factura.id_compra según tu modelo
  fecha_compra: factura.fecha_compra,
  cliente: factura.Usuario.nombre,
  productos: factura.detalle_compras.map(det => ({
    nombre: det.Producto.nombre,
    cantidad: det.cantidad,
    precio_unitario: det.precio_unitario,
    subtotal: det.subtotal
  })),
  total: factura.total
};

    res.status(201).json({ msg: "Compra realizada con éxito", factura: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al realizar la compra", error: error.message });
  }
});

module.exports = router;

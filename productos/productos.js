const app = require("express"); 
const router = app.Router();
const authMiddleware = require("../auth");
const Producto = require("../models/producto");

//ver productos
router.get("/productos", authMiddleware, async (req, res) => {
  try {
    //requisito de rol
    if (req.user.role !== "administrador") {
      return res.status(403).json({ error: "Acceso denegado, solo administradores" });
    }

    //obtener productos
    const productos = await Producto.findAll();
    if (productos.length === 0) {
      return res.status(404).json({ msg: "sin existencia" });
    }

    res.json(productos);

    }catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ msg: "Error en el servidor", error });
    }
});


// Crear un producto
router.post("/productos", authMiddleware, async (req, res) => {

    try{
        if (req.user.role !== "administrador") {
        return res.status(403).json({ error: "Acceso denegado, solo administradores" });
        }
        //crear producto
        const {nombre, precio, stock, fecha_ingr } = req.body;
        const nuevoProducto = await Producto.create({nombre,precio, stock, fecha_ingr});
        res.status(201).json({ msg: "Producto agregado", producto: nuevoProducto });
    
    }catch(error){
        console.error("Error al crear producto:", error);
        res.status(500).json({ msg: "Error al insertar producto", error });
    }
});

// Actualizar un producto 
router.put("/productos/:num_lote", authMiddleware, async (req, res) => {
        
    try{
        if (req.user.role !== "administrador") {
        return res.status(403).json({ error: "Acceso denegado, solo administradores" });
        }

        //actualizar producto
        const { num_lote } = req.params;
        const { nombre, precio, stock, fecha_ingr } = req.body;

        const [updated] = await Producto.update({ nombre, precio, stock, fecha_ingr },{ where: { num_lote } });
        if (updated === 0) {return res.status(404).json({ msg: "Producto no encontrado" })};

        const productoActualizado = await Producto.findOne({ where: { num_lote } });
        res.json({ msg: "Producto actualizado", producto: productoActualizado });

    }catch(error){
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ msg: "Error al actualizar producto", error });
    }
});

// Eliminar un producto
router.delete("/productos/:num_lote", authMiddleware, async(req, res) => {

    try{
        if (req.user.role !== "administrador") {
        return res.status(403).json({ error: "Acceso denegado, solo administradores" });
        }
        const { num_lote } = req.params;

        const deleted = await Producto.destroy({ where: { num_lote } });
        if (deleted === 0) {return res.status(404).json({ msg: "Producto no encontrado" });}
        res.json({ msg: "Producto eliminado correctamente" });

    }catch(error){
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ msg: "Error al eliminar producto", error });
    }
});


module.exports = router;
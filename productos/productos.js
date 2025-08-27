const app = require("express");
const db = require("../bbdd");  
const router = app.Router();
const authMiddleware = require("../auth");

//ver productos
router.get("/productos", authMiddleware, (req, res) => { 
     if (req.user.role !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado, solo administradores" });
  }
    
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) return res.status(500).json({ msg: "Error al obtener productos", error: err });
        res.json(results);
    }); 

});


// Crear un producto
router.post("/productos", authMiddleware, (req, res) => {

    if (req.user.role !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado, solo administradores" });
    }
    const {nombre, precio, stock, fecha_ingr } = req.body;

    const sql = "INSERT INTO productos (nombre, precio, stock, fecha_ingr) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, precio, stock, fecha_ingr], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error al insertar producto", error: err });
        res.json({ msg: "Producto agregado", id: result.insertId });
    });
    
});

// Actualizar un producto 
router.put("/productos/:num_lote", authMiddleware, (req, res) => {
        
    if (req.user.role !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado, solo administradores" });
    }
    const { num_lote } = req.params;
    const { nombre, precio, stock, fecha_ingr } = req.body;

    const sql = "UPDATE productos SET nombre = ?, precio = ?, stock = ?, fecha_ingr = ? WHERE num_lote = ?";
    db.query(sql, [nombre, precio, stock, fecha_ingr, num_lote], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error al actualizar producto", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ msg: "Producto no encontrado" });
        res.json({ msg: "Producto actualizado" });
    });
});

// Eliminar un producto
router.delete("/productos/:num_lote", authMiddleware,(req, res) => {

    if (req.user.role !== "administrador") {
    return res.status(403).json({ error: "Acceso denegado, solo administradores" });
    }
   const { num_lote } = req.params;

    const sql = "DELETE FROM productos WHERE num_lote = ?";
    db.query(sql, [num_lote], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error al eliminar producto", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ msg: "Producto no encontrado" });
        res.json({ msg: "Producto eliminado" });
    });
});


module.exports = router;
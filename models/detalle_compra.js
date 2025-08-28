const { DataTypes } = require("sequelize");
const sequelize = require("../bbdd");
const Compra = require("./compras");
const Producto = require("./producto");

const DetalleCompra = sequelize.define("detalle_compra", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_compra: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  tableName: "detalle_compras",
  timestamps: false
});

DetalleCompra.belongsTo(Producto, { foreignKey: "id_producto" });
Producto.hasMany(DetalleCompra, { foreignKey: "id_producto" });

module.exports = DetalleCompra;

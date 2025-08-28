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
    references: {
      model: Compra,
      key: "id_compra",
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: "id_producto",
    }
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

module.exports = DetalleCompra;

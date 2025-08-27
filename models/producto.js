// models/Usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../bbdd");

const Producto = sequelize.define("Producto", {
  num_lote: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  fecha_ingr: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "productos",
  timestamps: false     
});

module.exports = Producto;

const { DataTypes } = require("sequelize");
const sequelize = require("../bbdd");
const Usuario = require("./user");

const Compra = sequelize.define("Compra", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_compra: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id_usuario",
    }
  }
}, {
  tableName: "compras",
  timestamps: false
});

module.exports = Compra;

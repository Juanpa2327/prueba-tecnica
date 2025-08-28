const { DataTypes } = require("sequelize");
const sequelize = require("../bbdd");
const Usuario = require("./user");
const DetalleCompra = require("./detalle_compra");

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
  },
}, {
  tableName: "compras",
  timestamps: false
});


Compra.hasMany(DetalleCompra, { foreignKey: "id_compra" });
DetalleCompra.belongsTo(Compra, { foreignKey: "id_compra" });

module.exports = Compra;

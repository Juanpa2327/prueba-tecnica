// models/Usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../bbdd");
const Compra = require("./compras");

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "usuarios",
  timestamps: false     
});

Usuario.hasMany(Compra, { foreignKey: "id_usuario" });
Compra.belongsTo(Usuario, { foreignKey: "id_usuario" });

module.exports = Usuario;

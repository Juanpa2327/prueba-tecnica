const { Sequelize } = require("sequelize");

// conexión
const sequelize = new Sequelize("prueba_tecnica", "root", "", {
  host: "localhost",
  dialect: "mysql", 
});

module.exports = sequelize;





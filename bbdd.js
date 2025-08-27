const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json()); 

// conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",       
    password: "",  
    database: "prueba_tecnica"
});


db.connect(err => {
    if (err) {
        console.error("Error con la conexión a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos");
});

module.exports = db;

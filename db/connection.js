import { Sequelize } from "sequelize";

// Creando la conexion a la DB
const db = new Sequelize('coppel', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;


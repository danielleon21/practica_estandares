import { Sequelize } from "sequelize";


const db = new Sequelize('coppel', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;


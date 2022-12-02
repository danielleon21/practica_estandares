import Sequelize from "sequelize";
import db from "../db/connection.js";

export const Puesto = db.define('puestos', {
    nombre: {
        type: Sequelize.INTEGER
    }
})


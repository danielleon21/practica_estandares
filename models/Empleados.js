import { CHAR, DATE, INTEGER, STRING } from 'sequelize'
import db from '../db/connection.js'

export const Empleado = db.define('empleados', {
    nombre: {
        type: STRING
    },
    apellido: {
        type: STRING
    },
    sexo: {
        type: CHAR
    },
    fechaNacimiento: {
        type: DATE
    },
    fechaAlta: {
        type: DATE
    },
    idPuesto: {
        type: INTEGER
    }
})
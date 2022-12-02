import db from "../db/connection.js";

const paginaInicio = async (req, res) => {
    const promiseDB = []

    promiseDB.push(db.query("SELECT idPuesto, nombre FROM puestos"));
    promiseDB.push(db.query("SELECT idEmpleado, nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto FROM empleados"));

    try {
        const datos = await Promise.all(promiseDB)
        const puestos = datos[0][0];
        const empleados = datos[1][0];

        res.render('inicio', {
            puestos,
            empleados
        });
    } catch (e) {
        console.log(e);
    }

}

const agregarPuesto = async (req, res) => {
    res.render('agregar-puesto');
}

const agregarEmpleado = async (req, res) => {

    try {
        const [puestos] = await db.query("SELECT idPuesto, nombre FROM puestos");

        res.render('agregar-empleado', {
            puestos
        });
    } catch (e) {
        console.log(e)
    }

}



export {
    paginaInicio,
    agregarPuesto,
    agregarEmpleado
}
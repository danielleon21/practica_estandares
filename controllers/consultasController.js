import db from "../db/connection.js";

const paginaInicio = async (req, res) => {
    const promiseDB = []

    promiseDB.push(db.query("SELECT idPuesto, nombre FROM puestos"));
    promiseDB.push(db.query("SELECT idEmpleado, nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto FROM empleados"));

    try {
        const datos = await Promise.all(promiseDB)
        const puestos = datos[0][0];
        const empleados = datos[1][0];

        res.render("inicio", {
            puestos,
            empleados
        });
    } catch (e) {
        console.log(e);
    }
}

const agregarPuesto = async (req, res) => {
    res.render("agregar-puesto", {
        error: false
    });
}

const guardarPuesto = async (req, res) => {
    const { nombre } = req.body;
    if (nombre === "") {
        res.render("agregar-puesto", {
            error: true
        });
        return;
    }
    await db.query(`INSERT INTO puestos (nombre) VALUES ("${nombre}")`)
    res.redirect('/');
}

const editarPuesto = async (req, res) => {
    const { idPuesto } = req.params;
    const { nombre } = req.body;
    const method = req.method;

    if (method === "GET") {
        try {
            const [puesto] = await db.query(`SELECT nombre FROM puestos WHERE idPuesto = ${idPuesto}`)
            res.render('editar-puesto', {
                puesto: puesto[0],
                idPuesto
            })
        } catch (e) {
            console.log(e)
        }
    } else {
        try {
            await db.query(`UPDATE puestos SET nombre="${nombre}" WHERE idPuesto=${idPuesto}`)
            res.redirect('/')
        } catch (e) {
            console.log(e)
        }
    }

}

const eliminarPuesto = async (req, res) => {
    const { idPuesto } = req.params;

    try {
        await db.query(`DELETE FROM puestos WHERE idPuesto = ${idPuesto}`)
        res.redirect('/');
    } catch (e) {
        console.log(e)
    }

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

const guardarEmpleado = async (req, res) => {
    const { nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto } = req.body
    const intIdPuesto = parseInt(idPuesto)
    try {
        await db.query(`INSERT INTO empleados (nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto) VALUES ("${nombre}", "${apellido}", "${sexo}", "${fechaNacimiento}", "${fechaAlta}", ${intIdPuesto});`);

        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
}

const editarEmpleado = async (req, res) => {

    const { idEmpleado } = req.params;
    const { nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto } = req.body;

    const method = req.method;

    if (method === "GET") {
        try {
            const promiseDB = []

            promiseDB.push(db.query("SELECT idPuesto, nombre FROM puestos"));
            promiseDB.push(db.query(`SELECT idEmpleado, nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto FROM empleados WHERE idEmpleado = ${idEmpleado}`))

            const data = await Promise.all(promiseDB)

            const puestos = data[0][0];
            const empleado = data[1][0][0];

            res.render("editar-empleado", {
                puestos,
                empleado
            })
        } catch (e) {
            console.log(e)
        }
    } else {
        try {
            await db.query(`UPDATE empleados SET nombre="${nombre}", apellido="${apellido}", sexo="${sexo}", fechaNacimiento="${fechaNacimiento}", fechaAlta="${fechaAlta}", idPuesto = ${idPuesto} WHERE idEmpleado=${idEmpleado};`)
            res.redirect('/')
        } catch (e) {
            console.log(e)
        }
    }
}

const eliminarEmpleado = async (req, res) => {
    const { idEmpleado } = req.params;

    try {
        await db.query(`DELETE FROM empleados WHERE idEmpleado=${idEmpleado}`)
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
}



export {
    paginaInicio,
    agregarPuesto,
    agregarEmpleado,
    guardarPuesto,
    eliminarPuesto,
    editarPuesto,
    guardarEmpleado,
    editarEmpleado,
    eliminarEmpleado
}
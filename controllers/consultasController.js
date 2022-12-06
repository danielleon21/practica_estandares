import db from "../db/connection.js";

// Endpoint principal para la pagina de inicio donde se muestran las tablas de Empleados y de Puestos
const paginaInicio = async (req, res) => {
    // Arreglo de promises para ejecutarlas a la vez y no una por una
    const promiseDB = []

    
    promiseDB.push(db.query("SELECT idPuesto, nombre FROM puestos"));
    promiseDB.push(db.query("SELECT idEmpleado, nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto FROM empleados"));

    try {
        // Ejecuta todas las promise a la vez para hacer las llamadas a las bases de datos
        const datos = await Promise.all(promiseDB)

        // Consiguiendo los arreglos de objetos de Puestos y Empleados
        const puestos = datos[0][0];
        const empleados = datos[1][0];

        // Renderizado de la pantalla principal
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
    // Obteniendo el nombre de el formulario para hacer el insert en la BD
    const { nombre } = req.body;

    // Checkout de el nombre para no insertarlo vacio
    if (nombre === "") {
        res.render("agregar-puesto", {
            error: true
        });
        return;
    }

    try {
        // Consulta para la incersion a la DB 
        await db.query(`INSERT INTO puestos (nombre) VALUES ("${nombre}")`)
    }catch(e){
        console.log(e);
    }
    res.redirect('/');
}

// Endpoint para editar el puesto
const editarPuesto = async (req, res) => {

    // Destructuring para obtener el idPuesto de la URL y el nombre del formulario
    const { idPuesto } = req.params;
    const { nombre } = req.body;

    // Obteniendo el Metodo de la request
    const method = req.method;

    // Checando que metodo es para mostrar la vista de Editar Puesto o Hacer la consulta para editarlo.
    if (method === "GET") {
        try {

            // Destructure para obtener el puesto y mostrarlo en la vista
            const [puesto] = await db.query(`SELECT nombre FROM puestos WHERE idPuesto = ${idPuesto}`)
            res.render('editar-puesto', {
                puesto: puesto[0],
                idPuesto
            })
        } catch (e) {
            console.log(e)
        }
    } else {

        // Consulta para hacer el update en la DB
        try {
            await db.query(`UPDATE puestos SET nombre="${nombre}" WHERE idPuesto=${idPuesto}`)
            res.redirect('/')
        } catch (e) {
            console.log(e)
        }
    }

}

// Endpoint para eliminar puesto
const eliminarPuesto = async (req, res) => {
    const { idPuesto } = req.params;

    try {

        // Consulta a la DB para eliminar el Puesto
        await db.query(`DELETE FROM puestos WHERE idPuesto = ${idPuesto}`)
        res.redirect('/');
    } catch (e) {
        console.log(e)
    }

}


// Endpoint para agregar un empleado
const agregarEmpleado = async (req, res) => {

    try {
        // Destructure para obtener el puesto y mostrarlos en el Select de la vista
        const [puestos] = await db.query("SELECT idPuesto, nombre FROM puestos");

        res.render('agregar-empleado', {
            puestos
        });
    } catch (e) {
        console.log(e)
    }

}

const guardarEmpleado = async (req, res) => {
    // Destructure para obtener los valores del formulario
    const { nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto } = req.body
    // Parse al IdPuesto para insentarlo a la DB
    const intIdPuesto = parseInt(idPuesto)
    try {
        // Consulta (Insert) a la Base de Datos para agregar el empleado
        await db.query(`INSERT INTO empleados (nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto) VALUES ("${nombre}", "${apellido}", "${sexo}", "${fechaNacimiento}", "${fechaAlta}", ${intIdPuesto});`);

        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
}

// Endpoint para editar el Empleado en la DB
const editarEmpleado = async (req, res) => {

    // Obteniendo el idEmpleado para mostrarlo en la vista
    const { idEmpleado } = req.params;

    // Destructure para obtener los valores del formulario
    const { nombre, apellido, sexo, fechaNacimiento, fechaAlta, idPuesto } = req.body;

    // Obteniendo el Metodo de la request
    const method = req.method;

    // Checando que metodo es para mostrar la vista de Editar Empleado o Hacer la consulta para editarlo.
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
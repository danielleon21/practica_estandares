// Imports correspondientes de el manejador de rutas, express y la conexion a la base de datos
import express from "express";
import db from "./db/connection.js";
import router from "./routes/index.js";

const app = express();

db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(e => console.log(e));

const PORT = 3000;

// Set para el view engine de las vistas como "PUG"
app.set('view engine', 'pug');

// Seteando la carpeta publica
app.use(express.static('public'));

// Seteando el use para obtener valores enviados en formulario con el body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurando express para que utilize las rutas creadas en ./routes/index.js
app.use('/', router);

// Creando el servidor
app.listen(PORT, () => {
    console.log('Server on port 3000');
});
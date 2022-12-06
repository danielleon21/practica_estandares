Instrucciones para correr el codigo.

- Descargar los archivos correspondientes
- Correr npm install para instalar los modulos y paquetes necesarios
- Actualizar las credenciales de ./connection/db.js con los de tu base de datos
- Correr npm run dev para empezar el servidor de desarrollo.



- Las tablas necesarias para usar el programa son Empleados y Puestos
- Puestos: 
    - idPuesto INT (11) NOT NULL AUTO_INCREMENT,
    - nombre VARCHAR(60) NOT NULL
- Empleados:
    - idEmpleado INT(11) NOT NULL AUTO_INCREMENT,
    - nombre VARCHAR(60) NOT NULL,
    - apellido VARCHAR (60) NOT NULL,
    - sexo char(1) NOT NULL,
    - fechaNacimiento DATE NOT NULL,
    - fechaAlta DATE NOT NULL DEFAULT,
    - idPuesto INT(11) NOT NULL,

- Query para generar la tabla PUESTOS

    "
        CREATE TABLE puestos (
            idPuesto INT(11) NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(60) NOT NULL,
            PRIMARY KEY (idPuesto)
            );
    "

- Query para generar la tabla EMPLEADOS

    "
        CREATE TABLE empleados (
            idEmpleado INT(11) NOT NULL AUTO_INCREMENT,
            nombre VARCHAR(60) NOT NULL,
            apellido VARCHAR(60) NOT NULL,
            sexo CHAR(1) NOT NULL,
            fechaNacimiento DATE NOT NULL,
            fechaAlta DATE NOT NULL DEFAULT,
            idPuesto INT(11) NOT NULL,
            PRIMARY KEY (idEmpleado),
            KEY puestoId (puestoId),
            CONSTRAINT idPuesto_FK
            FOREIGN KEY (idPuesto),
            REFERENCE puestos(idPuesto)
        );
    "
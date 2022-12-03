import express from 'express';
import { paginaInicio, agregarPuesto, agregarEmpleado, guardarPuesto, eliminarPuesto, editarPuesto, guardarEmpleado } from '../controllers/consultasController.js';


const router = express.Router();

router.get('/', paginaInicio)

// endpoints para los puestos
router.get('/agregar-puesto', agregarPuesto)
router.post('/agregar-puesto', guardarPuesto)
router.get('/eliminar-puesto/:idPuesto', eliminarPuesto)
router.get('/editar-puesto/:idPuesto', editarPuesto)
router.post('/editar-puesto/:idPuesto', editarPuesto)
// endpoints para los empleados
router.get('/agregar-empleado', agregarEmpleado)
router.post('/agregar-empleado', guardarEmpleado)



export default router;
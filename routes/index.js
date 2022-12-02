import express from 'express';
import { paginaInicio, agregarPuesto, agregarEmpleado } from '../controllers/paginasController.js';


const router = express.Router();

router.get('/', paginaInicio)
router.get('/puestos', agregarPuesto)
router.get('/empleados', agregarEmpleado)


export default router;
import express from 'express';
import { paginaInicio } from '../controllers/paginasController.js';


const router = express.Router();

router.get('/', paginaInicio)


export default router;
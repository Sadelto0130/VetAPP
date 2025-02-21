import {Router}from 'express';
import { createRegistro, getAllRegistro, getRegistro, updateRegistro } from '../controllers/registro.controllers.js';

const router = Router();

router.get('/registros', getAllRegistro);

router.get('/registro/:id', getRegistro);

router.post('/crear_registro', createRegistro);

router.put('/actualizar_registro/:id', updateRegistro);

export default router; 
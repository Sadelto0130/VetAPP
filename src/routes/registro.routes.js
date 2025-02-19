import {Router}from 'express';

const router = Router();

router.get('/registro', (req, res) => res.send('Registros de actividad'));

router.get('/registro/:id', (req, res) => res.send('Registro de actividad'));

router.post('/registro', (req, res) => res.send('Agregando registro de actividad'));

router.put('/registro/:id', (req, res) => res.send('Actualizar registro de actividad'));

export default router;
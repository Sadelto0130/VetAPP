import {Router} from 'express';

const router = Router();

router.post('/pet', (req, res) => res.send('Agregando mascota'));

router.get('/pet', (req, res) => res.send('Listando mascotas'));

router.get('/pet/:id', (req, res) => res.send('Mascota'));

router.put('/pet/:id', (req, res) => res.send('Actualizar mascota'));

router.delete('/pet/.id', (req, res) => res.send('Eliminar mascota'));

export default router;
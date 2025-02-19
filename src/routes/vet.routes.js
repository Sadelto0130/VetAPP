import { Router } from 'express';

const router = Router();

router.post('/vet', (req, res) => res.send('Agregando veterinario'));

router.get('/vet', (req, res) => res.send('Listando veterinarios'));

router.get('/vet/:id', (req, res) => res.send('Veterinario'));

router.put('/vet/:id', (req, res) => res.send('Actualizar veterinario'));

router.delete('/vet/:id', (req, res) => res.send('Eliminar veterinario'));

export default router;
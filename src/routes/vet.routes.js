import { Router } from 'express';
import { createVet, deleteVet, getVet, getVets, updateVet } from '../controllers/vet.controllers.js';

const router = Router();

router.post('/vet', createVet);

router.get('/vet', getVets);

router.get('/vet/:id', getVet);

router.put('/vet/:id', updateVet);

router.delete('/vet/:id', deleteVet);

export default router; 
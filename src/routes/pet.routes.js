import { Router } from 'express';
import { addPet, deletePet, getPet, getPets, updatePet } from '../controllers/pet.controllers.js';

const router = Router();

router.post('/pet', addPet);

router.get('/pet', getPets);

router.get('/pet/:id', getPet) 

router.put('/pet/:id', updatePet);

router.delete('/pet/.id', deletePet);

export default router; 
import { Router } from 'express';
import { addPet, deletePet, getPet, getPets, updatePet } from '../controllers/pet.controllers.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/addpet', isAuth, addPet);

router.get('/pet', isAuth, getPets);

router.get('/pet/:id', isAuth, getPet) 

router.put('/pet/:id', isAuth, updatePet);

router.delete('/pet/.id', isAuth, deletePet);

export default router; 
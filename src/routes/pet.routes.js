import { Router } from 'express';
import { addPet, deletePet, getPet, getPets, updatePet } from '../controllers/pet.controllers.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import upload from '../libs/multer.js';

const router = Router();

router.post('/add_pet', isAuth, upload.single("foto"), addPet);

router.get('/get_pets', isAuth, getPets); 

router.get('/get_pet/:id', isAuth, getPet) 

router.put('/update_pet/:id', isAuth, upload.single("foto"), updatePet);

router.delete('/delete_pet/:id', isAuth, deletePet); 

export default router; 
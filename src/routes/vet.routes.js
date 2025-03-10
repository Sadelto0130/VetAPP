import { Router } from 'express';
import { getVet, updateVet, signin } from '../controllers/vet.controllers.js';
import { isAuth, tipoUsuarioVet } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/signin_vet', signin)

router.get('/vet/:id', isAuth, tipoUsuarioVet, getVet); 

router.put('/vet/:id', isAuth, tipoUsuarioVet, updateVet);

export default router; 
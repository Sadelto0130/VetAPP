import { Router } from 'express';

import {
  createClinic, 
  signinClinic, 
  updateClinic, 
  createVet, 
  deleteVete,
  getVets,
  allUsers,
  all_pets
} from '../controllers/clinic.controllers.js'

import { getVet, updateVet } from '../controllers/vet.controllers.js';

import { signin, logout} from '../controllers/auth.controllers.js';
import { isAuth, tipoUsuarioClinic } from '../middlewares/auth.middleware.js'
import upload from '../libs/multer.js';

const router = Router();

router.post('/signin_clinic', signinClinic);

router.post('/logout', logout);

router.post('/create_clinic', createClinic);

router.put('/update_clinic/:id', isAuth, tipoUsuarioClinic, updateClinic);

router.post('/create_vet', isAuth, tipoUsuarioClinic, upload.single("foto"), createVet);

router.put('/update_vet/:id', isAuth, tipoUsuarioClinic, updateVet);

router.delete('/delete_vet/:id', isAuth, tipoUsuarioClinic, deleteVete);

router.get('/get_vet/:id', isAuth, tipoUsuarioClinic, getVet)

router.get('/get_all_vets', isAuth, tipoUsuarioClinic, getVets);

router.get('/get_all_users', isAuth, tipoUsuarioClinic, allUsers);

//router.get('/get_user/:id', isAuth, tipoUsuarioClinic, );

router.get('/all_pets', isAuth, tipoUsuarioClinic, all_pets);

//router.get('/get_pet/:id', isAuth, tipoUsuarioClinic, );

export default router; 

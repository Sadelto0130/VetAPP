import Router from 'express-promise-router';
import { logout, profile, signin, signup, all_profile } from '../controllers/auth.controllers.js';
import { isAuth, tipoUsuario } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signin', signin);

router.post('/signup', signup);

router.post('/logout', logout);

router.get('/profile/:id', isAuth, profile);

router.get('/all_profiles/', isAuth, tipoUsuario, all_profile);

router.put('/profile/:id', isAuth, profile);

export default router; 
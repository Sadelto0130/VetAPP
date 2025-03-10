import Router from 'express-promise-router';
import { logout, profile, signin, register, updateProfile } from '../controllers/auth.controllers.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signin', signin);

router.post('/register', register);

router.post('/logout', logout);

router.get('/profile', isAuth, profile);

router.put('/update_profile', isAuth, updateProfile);

export default router; 
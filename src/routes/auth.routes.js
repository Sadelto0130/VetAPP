import Router from 'express-promise-router';
import { logout, profile, signin, register, updateProfile } from '../controllers/auth.controllers.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import {validateSchema} from '../middlewares/validate.middleware.js'
import { registrarseSchema, signinSchema} from '../schemas/auth.schema.js'

const router = Router();

router.post('/signin', validateSchema(signinSchema), signin); 

router.post('/register', validateSchema(registrarseSchema), register);

router.post('/logout', logout);

router.get('/profile', isAuth, profile);

router.put('/update_profile', isAuth, updateProfile);

export default router;  
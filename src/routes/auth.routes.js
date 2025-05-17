import Router from 'express-promise-router';
import { logout, profile, signin, register, updateProfile, me, refreshToken } from '../controllers/auth.controllers.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import {validateSchema} from '../middlewares/validate.middleware.js'
import { registrarseSchema, signinSchema} from '../schemas/auth.schema.js'

const router = Router();

router.post('/signin', validateSchema(signinSchema), signin); 

router.post('/register', validateSchema(registrarseSchema), register);

router.post('/logout', logout);

router.get('/profile', isAuth, profile);

router.put('/update_profile', isAuth, updateProfile);

router.get('/me', isAuth, me);

router.get("/refresh_token", refreshToken)

export default router;   
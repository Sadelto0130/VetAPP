import { Router } from 'express';

const router = Router();

router.post('/signin', (req, res) => res.send('Ingresando a la pagina'));

router.post('/signup', (req, res) => res.send('Registrando en la pagina'));

router.post('/logout', (req, res) => res.send('Cerrando sesion'));

router.get('/profile', (req, res) => res.send('Perfil de usuario'));

export default router;
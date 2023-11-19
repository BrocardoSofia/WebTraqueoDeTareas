import { Router } from 'express';
import { existeEmail,login,obtenerUsuario,registrarUsuario } from '../controllers/usuario';

const router = Router();

router.get('/verificar-email',existeEmail) //recibe body
router.post('/registrar-usuario',registrarUsuario) //recibe body
router.get('/login',login) //recibe body
router.get('/:id',obtenerUsuario) //recibe parametro


export default router;
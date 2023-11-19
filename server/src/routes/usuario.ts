import { Router } from 'express';
import { existeEmail,login,obtenerUsuario,registrarUsuario, verificarClave } from '../controllers/usuario';

const router = Router();

router.get('/verificar-email',existeEmail) //recibe query
router.post('/registrar-usuario',registrarUsuario) //recibe body
router.get('/login',login) //recibe query
router.get('/:id',obtenerUsuario) //recibe params
router.get('/verificar-clave/:id',verificarClave) //recibe params y query


export default router;